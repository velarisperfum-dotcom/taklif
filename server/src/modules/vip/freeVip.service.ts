import fs from 'fs'
import path from 'path'
import { prisma } from '../../db.js'

export interface FreeVipRequest {
  id: string
  name: string
  contact: string
  telegramId?: number | string
  source: 'website' | 'telegram_bot' | 'mini_app'
  slug?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  respondedAt?: string
}

// In-memory + persistent fallback file for resilience
const STORAGE_FILE = path.resolve(process.cwd(), 'free_vip_requests.json')

class FreeVipService {
  private requests: Map<string, FreeVipRequest> = new Map()
  private approvedIdentifiers: Set<string> = new Set()

  constructor() {
    this.loadFromDisk()
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8')
        const data: FreeVipRequest[] = JSON.parse(raw)
        data.forEach((r) => {
          this.requests.set(r.id, r)
          if (r.status === 'APPROVED') {
            if (r.contact) this.approvedIdentifiers.add(r.contact.toLowerCase().trim())
            if (r.telegramId) this.approvedIdentifiers.add(String(r.telegramId))
            if (r.slug) this.approvedIdentifiers.add(r.slug)
          }
        })
      }
    } catch (err) {
      console.warn('Could not load free VIP requests from disk:', err)
    }
  }

  private saveToDisk() {
    try {
      const arr = Array.from(this.requests.values())
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(arr, null, 2), 'utf-8')
    } catch (err) {
      console.warn('Could not save free VIP requests to disk:', err)
    }
  }

  createRequest(params: {
    name: string
    contact: string
    telegramId?: number | string
    source?: 'website' | 'telegram_bot' | 'mini_app'
    slug?: string
  }): FreeVipRequest {
    const id = 'req_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)
    const req: FreeVipRequest = {
      id,
      name: params.name.trim(),
      contact: params.contact.trim(),
      telegramId: params.telegramId,
      source: params.source || 'website',
      slug: params.slug,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }

    this.requests.set(id, req)
    this.saveToDisk()
    return req
  }

  getRequest(id: string): FreeVipRequest | undefined {
    return this.requests.get(id)
  }

  updateStatus(id: string, status: 'APPROVED' | 'REJECTED'): FreeVipRequest | undefined {
    const req = this.requests.get(id)
    if (!req) return undefined

    req.status = status
    req.respondedAt = new Date().toISOString()
    this.requests.set(id, req)

    if (status === 'APPROVED') {
      if (req.contact) this.approvedIdentifiers.add(req.contact.toLowerCase().trim())
      if (req.telegramId) this.approvedIdentifiers.add(String(req.telegramId))
      if (req.slug) this.approvedIdentifiers.add(req.slug)
    }

    this.saveToDisk()
    return req
  }

  isVipApproved(identifier?: string): boolean {
    if (!identifier) return false
    const clean = identifier.toLowerCase().trim()
    return this.approvedIdentifiers.has(clean)
  }

  getAllRequests(): FreeVipRequest[] {
    return Array.from(this.requests.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async getStats() {
    let totalInvitations = 0
    try {
      totalInvitations = await prisma.invitation.count()
    } catch {
      totalInvitations = 0
    }

    const all = Array.from(this.requests.values())
    const pending = all.filter((r) => r.status === 'PENDING').length
    const approved = all.filter((r) => r.status === 'APPROVED').length
    const rejected = all.filter((r) => r.status === 'REJECTED').length

    return {
      totalInvitations,
      totalFreeRequests: all.length,
      pendingRequests: pending,
      approvedRequests: approved,
      rejectedRequests: rejected,
    }
  }
}

export const freeVipService = new FreeVipService()
