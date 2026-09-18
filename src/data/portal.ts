export type PortalStatus = 'Action needed' | 'Current' | 'In progress' | 'Paid'

export type PortalDocument = {
  id: string
  name: string
  category: string
  updatedAt: string
  size: string
}

export type PortalRequest = {
  id: string
  title: string
  service: string
  updatedAt: string
  status: PortalStatus
}

export type PortalInvoice = {
  id: string
  reference: string
  issuedAt: string
  dueAt: string
  amount: string
  status: PortalStatus
}

export type PortalMessage = {
  id: string
  sender: string
  subject: string
  preview: string
  receivedAt: string
  unread: boolean
}

export const portalDocuments: PortalDocument[] = [
  { id: 'doc-1', name: '2026 Provisional Tax Pack', category: 'Tax', updatedAt: '18 Sep 2026', size: '2.4 MB' },
  { id: 'doc-2', name: 'August Management Accounts', category: 'Accounting', updatedAt: '12 Sep 2026', size: '1.1 MB' },
  { id: 'doc-3', name: 'Signed Engagement Letter', category: 'Legal', updatedAt: '02 Sep 2026', size: '640 KB' },
  { id: 'doc-4', name: 'VAT201 Supporting Schedule', category: 'VAT', updatedAt: '29 Aug 2026', size: '880 KB' },
]

export const portalRequests: PortalRequest[] = [
  { id: 'req-1', title: 'Upload August bank statements', service: 'Monthly accounting', updatedAt: '18 Sep 2026', status: 'Action needed' },
  { id: 'req-2', title: 'Review provisional tax estimate', service: 'Income tax', updatedAt: '17 Sep 2026', status: 'In progress' },
  { id: 'req-3', title: 'Confirm payroll changes for September', service: 'Payroll', updatedAt: '15 Sep 2026', status: 'Current' },
]

export const portalInvoices: PortalInvoice[] = [
  { id: 'inv-1', reference: 'HV-2026-0918', issuedAt: '01 Sep 2026', dueAt: '30 Sep 2026', amount: 'R 4,850.00', status: 'Current' },
  { id: 'inv-2', reference: 'HV-2026-0811', issuedAt: '01 Aug 2026', dueAt: '31 Aug 2026', amount: 'R 4,850.00', status: 'Paid' },
  { id: 'inv-3', reference: 'HV-2026-0712', issuedAt: '01 Jul 2026', dueAt: '31 Jul 2026', amount: 'R 4,850.00', status: 'Paid' },
]

export const portalMessages: PortalMessage[] = [
  { id: 'msg-1', sender: 'Thandi Mokoena', subject: 'Provisional tax estimate ready', preview: 'Your September estimate is ready for review. Please check the assumptions before we submit.', receivedAt: '09:42', unread: true },
  { id: 'msg-2', sender: 'Highveld Advisory', subject: 'August accounts completed', preview: 'Your August management accounts have been finalized and are available in Documents.', receivedAt: 'Yesterday', unread: true },
  { id: 'msg-3', sender: 'Lerato Dlamini', subject: 'Payroll confirmation', preview: 'Thanks, the payroll changes have been noted for the September run.', receivedAt: '15 Sep', unread: false },
]

export const complianceItems = [
  { label: 'VAT201 return', due: '25 Sep 2026', status: 'Action needed' as PortalStatus },
  { label: 'EMP201 payment', due: '07 Oct 2026', status: 'Current' as PortalStatus },
  { label: 'Provisional tax IRP6', due: '31 Jan 2027', status: 'In progress' as PortalStatus },
]
