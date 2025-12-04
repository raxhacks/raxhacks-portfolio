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

interface Tag {
    id: string
    name: string
}

function TagForm({ onSuccess }: { onSuccess?: () => void }) {
    const [name, setName] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        if (!name.trim()) {
            toast.error('Please enter a tag name')
            return
        }

        try {
            setSubmitting(true)
            const res = await fetch('/api/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Tag created successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error creating tag: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="text-sm">Tag Name *</label>
            <input
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. React, TypeScript, Node.js"
            />

            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    )
}

function EditTagForm({ tag, onSuccess }: { tag: Tag; onSuccess?: () => void }) {
    const [name, setName] = useState(tag.name)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        if (!name.trim()) {
            toast.error('Please enter a tag name')
            return
        }

        try {
            setSubmitting(true)
            const res = await fetch(`/api/tags/${tag.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Tag updated successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error updating tag: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="text-sm">Tag Name *</label>
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

export default function TagsTable() {
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    async function fetchTags() {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch('/api/tags')
            if (!res.ok) throw new Error('Failed to fetch tags')
            const data = await res.json()
            setTags(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load tags')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])

    async function handleDelete(tagId: string) {
        if (deleting) return
        if (!confirm('Delete this tag? This will remove it from all projects.')) return

        try {
            setDeleting(tagId)
            const res = await fetch(`/api/tags/${tagId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete')
            setTags((prev) => prev.filter((t) => t.id !== tagId))
            toast.success('Tag deleted successfully')
        } catch (err: any) {
            toast.error('Error deleting tag: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    function handleSuccess() {
        setDialogOpen(false)
        fetchTags()
    }

    return (
        <div>
            <div className="flex mt-8 mb-4 items-center">
                <h2 className="text-xl">Tags</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <button className="ml-auto px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors text-white">
                            Add Tag
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Tag</DialogTitle>
                            <DialogDescription>
                                Create a new tag that can be assigned to projects.
                            </DialogDescription>
                        </DialogHeader>

                        <TagForm onSuccess={handleSuccess} />

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
                                Loading tags...
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
                    {!loading && !error && tags.length === 0 && (
                        <tr>
                            <td colSpan={2} className="text-center py-8 text-gray-400">
                                No tags found
                            </td>
                        </tr>
                    )}
                    {!loading && !error && tags.map((tag) => (
                        <tr key={tag.id} className="[&>td]:border [&>td]:border-gray-700 [&>td]:px-4 [&>td]:py-2">
                            <td>
                                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                                    {tag.name}
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
                                            <DialogTitle>Edit Tag</DialogTitle>
                                            <DialogDescription>
                                                Update the tag name.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <EditTagForm tag={tag} onSuccess={handleSuccess} />

                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="ghost">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <button
                                    onClick={() => handleDelete(tag.id)}
                                    disabled={deleting === tag.id}
                                    className="ml-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-white disabled:opacity-50"
                                >
                                    {deleting === tag.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
