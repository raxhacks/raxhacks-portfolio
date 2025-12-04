"use client"

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Link {
    id: string
    name: string
}

function LinkForm({ onSuccess }: { onSuccess?: () => void }) {
    const [name, setName] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        if (!name.trim()) {
            toast.error('Please enter a link type name')
            return
        }

        try {
            setSubmitting(true)
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Link type created successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error creating link type: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="text-sm">Link Type Name *</label>
            <input
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. GitHub, Demo, Documentation"
            />

            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    )
}

function EditLinkForm({ link, onSuccess }: { link: Link; onSuccess?: () => void }) {
    const [name, setName] = useState(link.name)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        if (!name.trim()) {
            toast.error('Please enter a link type name')
            return
        }

        try {
            setSubmitting(true)
            const res = await fetch(`/api/links/${link.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Link type updated successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error updating link type: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="text-sm">Link Type Name *</label>
            <input
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default function LinksTable() {
    const [links, setLinks] = useState<Link[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    async function fetchLinks() {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch('/api/links')
            if (!res.ok) throw new Error('Failed to fetch link types')
            const data = await res.json()
            setLinks(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load link types')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    async function handleDelete(linkId: string) {
        if (deleting) return
        if (!confirm('Delete this link type? This will remove it from all projects.')) return

        try {
            setDeleting(linkId)
            const res = await fetch(`/api/links/${linkId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete')
            setLinks((prev) => prev.filter((l) => l.id !== linkId))
            toast.success('Link type deleted successfully')
        } catch (err: any) {
            toast.error('Error deleting link type: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    function handleSuccess() {
        setDialogOpen(false)
        fetchLinks()
    }

    return (
        <div>
            <div className="flex mt-8 mb-4 items-center">
                <h2 className="text-xl">Link Types</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <button className="ml-auto px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors text-white">
                            Add Link Type
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Link Type</DialogTitle>
                            <DialogDescription>
                                Create a new link type that can be assigned to projects (e.g. GitHub, Demo, Documentation).
                            </DialogDescription>
                        </DialogHeader>

                        <LinkForm onSuccess={handleSuccess} />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <table className="min-w-full border border-gray-700">
                <thead>
                    <tr className="[&>th]:border [&>th]:border-white [&>th]:px-4 [&>th]:py-2">
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={2} className="text-center py-8 text-gray-400">
                                Loading link types...
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan={2} className="text-center py-8 text-red-500 bg-red-500/10">
                                {error}
                            </td>
                        </tr>
                    )}
                    {!loading && !error && links.length === 0 && (
                        <tr>
                            <td colSpan={2} className="text-center py-8 text-gray-400">
                                No link types found
                            </td>
                        </tr>
                    )}
                    {!loading && !error && links.map((link) => (
                        <tr key={link.id} className="[&>td]:border [&>td]:border-gray-700 [&>td]:px-4 [&>td]:py-2">
                            <td>
                                <span className="px-3 py-1 bg-teal-600 text-white rounded-md text-sm">
                                    {link.name}
                                </span>
                            </td>
                            <td>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white">
                                            Modify
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Link Type</DialogTitle>
                                            <DialogDescription>
                                                Update the link type name.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <EditLinkForm link={link} onSuccess={handleSuccess} />

                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="ghost">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <button
                                    onClick={() => handleDelete(link.id)}
                                    disabled={deleting === link.id}
                                    className="ml-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-white disabled:opacity-50"
                                >
                                    {deleting === link.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
