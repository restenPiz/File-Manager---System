import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import TableUser from "@/Components/TableUser";

export default function User({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Users</h2>}

        >

            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TableUser></TableUser>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}