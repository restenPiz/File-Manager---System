import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Alert, Card } from "flowbite-react";
import { Modal, Button, Dropdown } from "flowbite-react";
import { FormEventHandler, useState } from 'react';

interface Folder {
    id: number;
    Folder_name: string;
}

interface PageProps {
    auth: { user: { id: number } };
    folders: Folder[];
}

export default function Folder({ auth, folders }: PageProps) {

    //*Inicio dos estados da app
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

    const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
    const [deletingFolderId, setDeletingFolderId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { post, data, reset, setData } = useForm({
        Folder_name: "",
        id_user: auth.user.id,
        Parent_id: 1,
    });

    //* Função para abrir o modal de edição e preencher os dados
    const openEditModal = (folder: Folder) => {
        setEditingFolder(folder); // Atualiza os dados da pasta sendo editada
        setData('Folder_name', folder.Folder_name); // Preenche o campo do formulário
        setIsEditModalOpen(true); // Abre o modal de edição
    };

    const openDeleteModal = (id: number) => {
        setDeletingFolderId(id);
        setIsDeleteModalOpen(true); // Abre o modal de confirmação
    };

    //*Start with the CREATE, UPDATE, DELETE function
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('storeFolder'), {
            onSuccess: () => {
                setSuccessMessage('Pasta adicionada com sucesso!');
                setIsCreateModalOpen(false);
                reset(); // Limpa o formulário
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            },
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingFolder) {
            post(route('updateFolder', { id: editingFolder.id }), {
                data: {
                    Folder_name: data.Folder_name,
                    Parent_id: data.Parent_id,
                    id_user: data.id_user,
                },
                onSuccess: () => {
                    setSuccessMessage('Pasta actualizada com sucesso!');
                    setIsEditModalOpen(false);
                    setEditingFolder(null);
                    reset(); 
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                },
            });
        }
    };

    const handleDelete = () => {
        if (deletingFolderId !== null) {
            post(route('deleteFolder', { id: deletingFolderId }), {
                onSuccess: () => {
                    setSuccessMessage('Pasta excluída com sucesso!');
                    setIsDeleteModalOpen(false);
                    setDeletingFolderId(null); 
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Folders</h2>}
        >

            {/* Main content */}
            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header com o título e botão */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            File Manager
                        </h2>
                        <Button className="bg-blue-950" onClick={() => setIsCreateModalOpen(true)}>
                            Add a new folder
                        </Button>
                    </div>

                    <div className="flex">
                        {successMessage && (
                            <div className="z-50">
                                <div
                                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                    role="alert"
                                >
                                    <span className="font-medium">Sucesso!</span> {successMessage}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Container para os cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Card */}
                        {folders.map((folder) => (
                            <Card className="max-w-sm flex-1 relative" key={folder.id}>
                                {/* Dropdown de ações no canto superior direito */}
                                <div className="flex justify-end px-4 pt-4">
                                    <Dropdown inline label="">
                                        <Dropdown.Item>
                                            <a
                                                onClick={() => openEditModal(folder)} // Passa os dados da pasta para o modal
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Edit
                                            </a>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Export Data
                                            </a>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <a
                                                onClick={() => openDeleteModal(folder.id)}
                                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Delete
                                            </a>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>

                                {/* Ícone centralizado no topo */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center bg-gray-100 rounded-full p-2 shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-blue-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75v10.5a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25h-7.28a.75.75 0 01-.53-.22L6.97 3.53a.75.75 0 00-.53-.22H6a2.25 2.25 0 00-2.25 2.25z"
                                        />
                                    </svg>
                                </div>

                                {/* Conteúdo principal da card */}
                                <div className="flex flex-col items-center pb-10">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        <Link href={route('file')} >
                                            {folder.Folder_name}
                                        </Link>
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        2 GB
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal de Criação */}
            <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <Modal.Header>Add a New Folder</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Folder Name
                            </label>
                            <input
                                name="Folder_name"
                                value={data.Folder_name}
                                onChange={(e) => setData('Folder_name', e.target.value)}
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter folder name"
                            />
                            <input
                                type="hidden"
                                value={auth.user.id}
                                name="id_user"
                            />
                            <input
                                type="hidden"
                                name="Parent_id"
                                value={data.Parent_id}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-blue-950">
                                Create
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal de Edição */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <Modal.Header>Edit Folder</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEdit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Folder Name
                            </label>
                            <input
                                name="Folder_name"
                                value={data.Folder_name}
                                onChange={(e) => setData('Folder_name', e.target.value)}
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter folder name"
                            />
                            <input
                                type="hidden"
                                value={auth.user.id}
                                name="id_user"
                            />
                            <input
                                type="hidden"
                                name="Parent_id"
                                value={data.Parent_id}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-blue-950">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/*Inicio do modal de eliminar*/}
            <Modal show={isDeleteModalOpen} onClose={toggleDeleteModal}>
                <Modal.Header>Confirm Deletion</Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this folder?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={toggleDeleteModal}>
                        Cancel
                    </Button>
                    <Button className="bg-red-700 text-gray-100" color="failure" onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </AuthenticatedLayout>
    );
}
