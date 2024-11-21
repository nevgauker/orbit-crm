import { Contact, Email, Lead, Opportunity, Task } from "@prisma/client"

export type Totals = {
    contacts: number
    leads: number
    opportunities: number
    tasks: number
}
export type DashboardResponse = {
    totals: Totals
    contacts: Contact[]
    leads: Lead[]
    opportunities: Opportunity[]
    tasks: Task[]
    emails: Email[]
}
