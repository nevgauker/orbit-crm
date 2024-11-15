import { ContactsTable } from "@/components/tables/contacts_table";

function ContactsPage() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Contacts</h1>
            <p className="text-gray-600 mb-6">
                View and manage all your contacts here. Add, edit, or remove contacts as needed.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <ContactsTable />
            </div>
        </div>
    );
}

export default ContactsPage