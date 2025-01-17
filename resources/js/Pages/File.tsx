import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Checkbox, Table, Dropdown, Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function File({ auth, folderId }: PageProps) {
    console.log('Folder ID:', folderId); 

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { post, data, setData, reset } = useForm({
        Path: '',
        Quantity: '',
        File_name: '',
        id_folder: folderId,
        id_user: auth.user.id, // Puxando o ID do usuário autenticado
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setData('Quantity', (file.size / (1024 * 1024)).toFixed(2)); // Tamanho do arquivo em MB
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setData('id_folder', folderId);

        post(route('storefile'), {
            onSuccess: () => {
                setSuccessMessage('File uploaded successfuly!');
                setIsCreateModalOpen(false);
                reset();
                setSelectedFile(null);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            },
        });
    };

    const handleBack = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Files</h2>}
        >

            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            File Manager
                        </h2>
                        <div className="flex space-x-4">
                            <Button className="bg-green-800 flex items-center" onClick={handleBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Voltar
                            </Button>
                            <Button className="bg-blue-950 flex items-center" onClick={() => setIsCreateModalOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8l-8 8-8-8" />
                                </svg>
                                Upload File
                            </Button>
                        </div>
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

                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-4">

                            </Table.HeadCell>
                            <Table.HeadCell>File Name</Table.HeadCell>
                            <Table.HeadCell>Size</Table.HeadCell>
                            <Table.HeadCell>Last Modified</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2-2h-6a2 2 0 00-2 2v0z"
                                        />
                                    </svg>
                                    {'api-keys.html'}
                                </Table.Cell>
                                <Table.Cell>2gb</Table.Cell>
                                <Table.Cell>
                                    11-09-2024
                                </Table.Cell>
                                <Table.Cell>
                                    {/* Ícone de três pontos (Menu de opções) */}
                                    <Dropdown inline>

                                        {/* Itens do dropdown */}
                                        <Dropdown.Item>
                                            <a
                                                href="#"
                                                onClick={() => { /* Função para editar */ }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Edit
                                            </a>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <a
                                                href="#"
                                                onClick={() => { /* Função para excluir */ }}
                                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Delete
                                            </a>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                        <Modal.Header>Upload de Arquivo</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                {/* Campo para selecionar o arquivo */}
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            name="Path"
                                            id="dropzone-file"
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const fileSizeMB = file.size / (1024 * 1024);
                                                    const maxSizeMB = 10;

                                                    if (fileSizeMB > maxSizeMB) {
                                                        alert(`O arquivo é muito grande! O tamanho máximo permitido é ${maxSizeMB}MB.`);
                                                        return;
                                                    }

                                                    setData("Path", file);
                                                    setData("Quantity", `${fileSizeMB.toFixed(2)} MB`);
                                                }
                                            }}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <br />

                                {/* Campo para Nome do Arquivo */}
                                <div className="mb-4">
                                    <input
                                        name="File_name"
                                        type="text"
                                        onChange={(e) => setData("File_name", e.target.value)}
                                        placeholder="Nome do Arquivo"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Campos com valores automáticos */}
                                <input
                                    name="id_user"
                                    value={auth.user.id}
                                    readOnly
                                    className="hidden"
                                />
                                <input name="id_folder" value={folderId} readOnly hidden />

                                {/* Botão de Upload */}
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-950">
                                        Upload
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}