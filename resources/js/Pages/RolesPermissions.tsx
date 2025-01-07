import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function RolesPermissions({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Roles and Permissions</h2>}

        >
            <Head title="File Manager" />

            <div className="hidden sm:flex sm:items-center sm:ms-6">
                <div className="ms-3 relative">

                </div>
            </div>

        </AuthenticatedLayout>
    );
}