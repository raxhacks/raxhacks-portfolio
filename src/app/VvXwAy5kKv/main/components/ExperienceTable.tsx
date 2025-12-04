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

interface Experience {
    id: string
    company_name: string
    company_logo_url: string | null
    role: string
    description: string | null
    start_date: string
    end_date: string | null
}
import { formatDate } from '@/app/helpers/dateHelper'

function ExperienceForm({ onSuccess }: { onSuccess?: () => void }) {
    const [companyName, setCompanyName] = useState('')
    const [role, setRole] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        if (!companyName || !role || !startDate || !description || !file) {
            toast.error('Please fill all required fields')
            return
        }

        const formData = new FormData()
        formData.append('company_name', companyName)
        formData.append('role', role)
        formData.append('start_date', startDate)
        formData.append('end_date', endDate)
        formData.append('description', description)
        formData.append('company_logo', file)

        try {
            setSubmitting(true)
            const res = await fetch('/api/experiences', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Experience created successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error creating experience: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="text-sm">Company name *</label>
            <input className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

            <label className="text-sm">Role *</label>
            <input className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)} />

            <label className="text-sm">Start date *</label>
            <input type="date" className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label className="text-sm">End date</label>
            <input type="date" className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <label className="text-sm">Description *</label>
            <textarea className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2 min-h-[80px]" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label className="text-sm">Company logo (SVG only) *</label>
            <input type="file" accept=".svg,image/svg+xml" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

            <div className="flex justify-end">
                <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</Button>
            </div>
        </form>
    )
}

export default function ExperienceTable() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    async function fetchExperiences() {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch('/api/experiences')
            if (!res.ok) throw new Error('Failed to fetch experiences')
            const data = await res.json()
            setExperiences(data)
        } catch (err: any) {
            setError(err.message || 'Failed to load experiences')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchExperiences()
    }, [])

    async function handleDelete(id: string) {
        if (deleting) return
        if (!confirm('Delete this experience?')) return

        try {
            setDeleting(id)
            const res = await fetch(`/api/experiences/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete')
            setExperiences((prev) => prev.filter((e) => e.id !== id))
            toast.success('Experience deleted successfully')
        } catch (err: any) {
            toast.error('Error deleting experience: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    function handleSuccess() {
        setDialogOpen(false)
        fetchExperiences()
    }

    return (
        <div>
            <div className="flex mt-8 mb-4 items-center">
                <h2 className="text-xl">Experience</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <button className="ml-auto px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors text-white">
                            Add Experience
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Experience</DialogTitle>
                            <DialogDescription>Fill the form to add a new experience.</DialogDescription>
                        </DialogHeader>

                        <ExperienceForm onSuccess={handleSuccess} />

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
                        <th>Company</th>
                        <th>Company Logo URL</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={7} className="text-center py-8 text-gray-400">
                                Loading experiences...
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan={7} className="text-center py-8 text-red-500 bg-red-500/10">
                                {error}
                            </td>
                        </tr>
                    )}
                    {!loading && !error && experiences.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-8 text-gray-400">
                                No experiences found
                            </td>
                        </tr>
                    )}
                    {!loading && !error && experiences.map((exp) => (
                        <tr key={exp.id} className="[&>td]:border [&>td]:border-gray-700 [&>td]:px-4 [&>td]:py-2">
                            <td>{exp.company_name}</td>
                            <td className="max-w-[150px] truncate">
                                {exp.company_logo_url ? (
                                    <a href={exp.company_logo_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                        {exp.company_logo_url}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">-</span>
                                )}
                            </td>
                            <td>{exp.role}</td>
                            <td className="max-w-xs truncate">{exp.description || '-'}</td>
                            <td>{formatDate(exp.start_date)}</td>
                            <td>{formatDate(exp.end_date)}</td>
                            <td>
                                <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white">
                                    Modify
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    disabled={deleting === exp.id}
                                    className="ml-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-white disabled:opacity-50"
                                >
                                    {deleting === exp.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}