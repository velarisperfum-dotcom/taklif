import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import { HomePage } from './pages/HomePage'
import { TemplatesPage } from './pages/TemplatesPage'
import { TemplatePreviewPage } from './pages/TemplatePreviewPage'
import { CreateInvitationPage } from './pages/CreateInvitationPage'
import { InvitationPreviewPage } from './pages/InvitationPreviewPage'
import { PublicInvitationPage } from './pages/PublicInvitationPage'
import { DashboardPage } from './pages/DashboardPage'
import { PricingPage } from './pages/PricingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with standard layout */}
        <Route
          path="/"
          element={
            <PageLayout>
              <HomePage />
            </PageLayout>
          }
        />
        <Route
          path="/templates"
          element={
            <PageLayout>
              <TemplatesPage />
            </PageLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <PageLayout>
              <PricingPage />
            </PageLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PageLayout showFooter={false}>
              <LoginPage />
            </PageLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PageLayout showFooter={false}>
              <RegisterPage />
            </PageLayout>
          }
        />
        <Route
          path="/create"
          element={
            <PageLayout showFooter={false}>
              <CreateInvitationPage />
            </PageLayout>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PageLayout showFooter={false}>
              <CreateInvitationPage />
            </PageLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageLayout>
              <DashboardPage />
            </PageLayout>
          }
        />

        {/* Fullscreen Template Previews */}
        <Route path="/templates/:templateId" element={<TemplatePreviewPage />} />
        <Route path="/preview/:templateId" element={<TemplatePreviewPage />} />

        {/* Public Standalone Invitation Pages */}
        <Route path="/t/:slug" element={<PublicInvitationPage />} />
        <Route path="/invite/:slug" element={<PublicInvitationPage />} />
        <Route path="/invitations/:slug" element={<InvitationPreviewPage />} />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <PageLayout>
              <NotFoundPage />
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
