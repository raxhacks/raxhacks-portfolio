"use client"

import React, { useState, useRef, useEffect } from 'react'
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
import { X, Plus } from 'lucide-react'
import { toast } from 'sonner'

// Types
interface ImagePreview {
    id: string
    file: File
    preview: string
}

interface ProjectImage {
    id: string
    image_url: string
}

interface Tag {
    id: string
    name: string
}

interface Link {
    id: string
    name: string
}

interface ProjectLink {
    id: string
    link_id: string
    name: string
    url: string
}

interface ProjectTag {
    id: string
    tag_id: string
    name: string
}

interface SelectedLink {
    link_id: string
    name: string
    url: string
}

interface Project {
    id: string
    name: string
    year: number
    description: string | null
    project_logo_url: string | null
    images: ProjectImage[]
    tags: Tag[]
    links: { id: string; name: string; url: string }[]
}

// ============ PROJECT FORM ============
function ProjectForm({ 
    onSuccess, 
    availableTags, 
    availableLinks 
}: { 
    onSuccess?: () => void
    availableTags: Tag[]
    availableLinks: Link[]
}) {
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<ImagePreview[]>([])
    const [projectLogo, setProjectLogo] = useState<File | null>(null)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>([])
    const [submitting, setSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        const newImages: ImagePreview[] = []
        Array.from(files).forEach((file) => {
            const id = crypto.randomUUID()
            const preview = URL.createObjectURL(file)
            newImages.push({ id, file, preview })
        })
        setImages((prev) => [...prev, ...newImages])

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    function removeImage(id: string) {
        setImages((prev) => {
            const toRemove = prev.find((img) => img.id === id)
            if (toRemove) {
                URL.revokeObjectURL(toRemove.preview)
            }
            return prev.filter((img) => img.id !== id)
        })
    }

    function toggleTag(tagId: string) {
        setSelectedTags((prev) =>
            prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        )
    }

    function addLink(linkId: string, linkName: string) {
        if (selectedLinks.some((l) => l.link_id === linkId)) return
        setSelectedLinks((prev) => [...prev, { link_id: linkId, name: linkName, url: '' }])
    }

    function updateLinkUrl(linkId: string, url: string) {
        setSelectedLinks((prev) =>
            prev.map((l) => (l.link_id === linkId ? { ...l, url } : l))
        )
    }

    function removeLink(linkId: string) {
        setSelectedLinks((prev) => prev.filter((l) => l.link_id !== linkId))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        
        // Debug: show which fields are missing
        const missing: string[] = []
        if (!name) missing.push('Name')
        if (!year) missing.push('Year')
        if (!description) missing.push('Description')
        if (images.length === 0) missing.push('Images')
        
        if (missing.length > 0) {
            toast.error(`Missing required fields: ${missing.join(', ')}`)
            return
        }

        // Validate all links have URLs
        if (selectedLinks.some((l) => !l.url)) {
            toast.error('Please provide URLs for all selected links')
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('year', year)
        formData.append('description', description)
        images.forEach((img) => {
            formData.append('images', img.file)
        })
        if (projectLogo) {
            formData.append('project_logo', projectLogo)
        }
        formData.append('tags', JSON.stringify(selectedTags))
        formData.append('links', JSON.stringify(selectedLinks))

        try {
            setSubmitting(true)
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Project created successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error creating project: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2">
            <label className="text-sm">Name *</label>
            <input
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="text-sm">Year *</label>
            <input
                type="number"
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
            />

            <label className="text-sm">Description *</label>
            <textarea
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2 min-h-20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Project Logo */}
            <label className="text-sm">Project Logo (SVG)</label>
            <input
                type="file"
                accept=".svg,image/svg+xml"
                onChange={(e) => setProjectLogo(e.target.files?.[0] ?? null)}
                className="w-full"
            />
            {projectLogo && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Selected: {projectLogo.name}</span>
                    <button
                        type="button"
                        onClick={() => setProjectLogo(null)}
                        className="p-1 hover:bg-red-600/50 rounded"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}

            {/* Tags Selection */}
            <label className="text-sm">Tags</label>
            <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                    <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag.id)
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>

            {/* Links Selection */}
            <label className="text-sm">Links</label>
            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    {availableLinks.map((link) => {
                        const isSelected = selectedLinks.some((l) => l.link_id === link.id)
                        return (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() => addLink(link.id, link.name)}
                                disabled={isSelected}
                                className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-1 ${
                                    isSelected
                                        ? 'bg-green-600/50 text-white cursor-not-allowed'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                <Plus className="w-3 h-3" />
                                {link.name}
                            </button>
                        )
                    })}
                </div>
                {selectedLinks.length > 0 && (
                    <div className="space-y-2 mt-2">
                        {selectedLinks.map((link) => (
                            <div key={link.link_id} className="flex items-center gap-2">
                                <span className="text-sm text-gray-300 w-24">{link.name}:</span>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={link.url}
                                    onChange={(e) => updateLinkUrl(link.link_id, e.target.value)}
                                    className="flex-1 rounded-md border border-white/40 bg-transparent px-3 py-1 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeLink(link.link_id)}
                                    className="p-1 hover:bg-red-600/50 rounded"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Images */}
            <label className="text-sm">Images *</label>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full"
            />

            {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img) => (
                        <div key={img.id} className="relative group">
                            <img
                                src={img.preview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-md border border-white/20"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(img.id)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    )
}

// ============ EDIT PROJECT FORM ============
function EditProjectForm({ 
    project,
    onSuccess 
}: { 
    project: Project
    onSuccess?: () => void
}) {
    const [name, setName] = useState(project.name)
    const [year, setYear] = useState(project.year.toString())
    const [description, setDescription] = useState(project.description || '')
    const [projectLogo, setProjectLogo] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (submitting) return
        
        if (!name || !year) {
            toast.error('Name and Year are required')
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('year', year)
        formData.append('description', description)
        if (projectLogo) {
            formData.append('project_logo', projectLogo)
        }

        try {
            setSubmitting(true)
            const res = await fetch(`/api/projects/${project.id}`, {
                method: 'PUT',
                body: formData,
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed')
            }
            toast.success('Project updated successfully')
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error('Error updating project: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2">
            <label className="text-sm">Name *</label>
            <input
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="text-sm">Year *</label>
            <input
                type="number"
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />

            <label className="text-sm">Description</label>
            <textarea
                className="w-full rounded-md border border-white/40 bg-transparent px-3 py-2 min-h-20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Current Project Logo */}
            {project.project_logo_url && (
                <div>
                    <label className="text-sm">Current Logo</label>
                    <img 
                        src={project.project_logo_url} 
                        alt="Current logo" 
                        className="w-12 h-12 object-contain mt-1 border border-white/20 rounded p-1"
                    />
                </div>
            )}

            {/* Project Logo */}
            <label className="text-sm">New Project Logo (SVG)</label>
            <input
                type="file"
                accept=".svg,image/svg+xml"
                onChange={(e) => setProjectLogo(e.target.files?.[0] ?? null)}
                className="w-full"
            />
            {projectLogo && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Selected: {projectLogo.name}</span>
                    <button
                        type="button"
                        onClick={() => setProjectLogo(null)}
                        className="p-1 hover:bg-red-600/50 rounded"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}

            <p className="text-xs text-gray-500">
                Note: To manage images, tags, and links, use the respective buttons in the table.
            </p>

            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Updating...' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

// ============ IMAGES DIALOG ============
function ImagesDialog({ projectId, projectName, images: initialImages }: { projectId: string; projectName: string; images: ProjectImage[] }) {
    const [images, setImages] = useState<ProjectImage[]>(initialImages)
    const [newImages, setNewImages] = useState<ImagePreview[]>([])
    const [deleting, setDeleting] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        const previews: ImagePreview[] = []
        Array.from(files).forEach((file) => {
            const id = crypto.randomUUID()
            const preview = URL.createObjectURL(file)
            previews.push({ id, file, preview })
        })
        setNewImages((prev) => [...prev, ...previews])

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    function removeNewImage(id: string) {
        setNewImages((prev) => {
            const toRemove = prev.find((img) => img.id === id)
            if (toRemove) {
                URL.revokeObjectURL(toRemove.preview)
            }
            return prev.filter((img) => img.id !== id)
        })
    }

    async function handleDeleteImage(imageId: string) {
        if (deleting) return
        if (!confirm('Delete this image?')) return

        try {
            setDeleting(imageId)
            const res = await fetch(`/api/projects/${projectId}/images/${imageId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete')
            setImages((prev) => prev.filter((img) => img.id !== imageId))
            toast.success('Image deleted successfully')
        } catch (err: any) {
            toast.error('Error deleting image: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    async function handleUploadNewImages() {
        if (uploading || newImages.length === 0) return

        const formData = new FormData()
        newImages.forEach((img) => {
            formData.append('images', img.file)
        })

        try {
            setUploading(true)
            const res = await fetch(`/api/projects/${projectId}/images`, {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) throw new Error('Failed to upload')
            const uploaded = await res.json()
            setImages((prev) => [...prev, ...uploaded])
            newImages.forEach((img) => URL.revokeObjectURL(img.preview))
            setNewImages([])
            toast.success('Images uploaded successfully')
        } catch (err: any) {
            toast.error('Error uploading images: ' + err.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Images - {projectName}</DialogTitle>
                <DialogDescription>Manage images for this project</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Current Images ({images.length})</h4>
                    {images.length === 0 ? (
                        <p className="text-sm text-gray-400">No images yet</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {images.map((img) => (
                                <div key={img.id} className="relative group">
                                    <img
                                        src={img.image_url}
                                        alt="Project"
                                        className="w-24 h-24 object-cover rounded-md border border-white/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(img.id)}
                                        disabled={deleting === img.id}
                                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="text-sm font-medium mb-2">Add New Images</h4>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full mb-2"
                    />
                    {newImages.length > 0 && (
                        <>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {newImages.map((img) => (
                                    <div key={img.id} className="relative group">
                                        <img
                                            src={img.preview}
                                            alt="Preview"
                                            className="w-20 h-20 object-cover rounded-md border border-white/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(img.id)}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Button onClick={handleUploadNewImages} disabled={uploading} size="sm">
                                {uploading ? 'Uploading...' : `Upload ${newImages.length} image(s)`}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

// ============ TAGS DIALOG ============
function TagsDialog({ 
    projectId, 
    projectName, 
    tags: initialTags,
    availableTags 
}: { 
    projectId: string
    projectName: string
    tags: ProjectTag[]
    availableTags: Tag[]
}) {
    const [tags, setTags] = useState<ProjectTag[]>(initialTags)
    const [adding, setAdding] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)

    async function handleAddTag(tagId: string, tagName: string) {
        if (adding) return
        if (tags.some((t) => t.tag_id === tagId)) return

        try {
            setAdding(true)
            const res = await fetch(`/api/projects/${projectId}/tags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag_id: tagId }),
            })
            if (!res.ok) throw new Error('Failed to add tag')
            const created = await res.json()
            setTags((prev) => [...prev, { id: created.id, tag_id: tagId, name: tagName }])
            toast.success('Tag added successfully')
        } catch (err: any) {
            toast.error('Error adding tag: ' + err.message)
        } finally {
            setAdding(false)
        }
    }

    async function handleRemoveTag(projectTagId: string) {
        if (deleting) return
        if (!confirm('Remove this tag?')) return

        try {
            setDeleting(projectTagId)
            const res = await fetch(`/api/projects/${projectId}/tags/${projectTagId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to remove tag')
            setTags((prev) => prev.filter((t) => t.id !== projectTagId))
            toast.success('Tag removed successfully')
        } catch (err: any) {
            toast.error('Error removing tag: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Tags - {projectName}</DialogTitle>
                <DialogDescription>Manage tags for this project</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Current Tags</h4>
                    {tags.length === 0 ? (
                        <p className="text-sm text-gray-400">No tags yet</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-1"
                                >
                                    {tag.name}
                                    <button
                                        onClick={() => handleRemoveTag(tag.id)}
                                        disabled={deleting === tag.id}
                                        className="hover:bg-white/20 rounded-full p-0.5"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="text-sm font-medium mb-2">Add Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {availableTags
                            .filter((tag: Tag) => !tags.some((t) => t.tag_id === tag.id))
                            .map((tag: Tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => handleAddTag(tag.id, tag.name)}
                                    disabled={adding}
                                    className="px-3 py-1 bg-white/10 text-gray-300 hover:bg-white/20 rounded-full text-sm flex items-center gap-1 disabled:opacity-50"
                                >
                                    <Plus className="w-3 h-3" />
                                    {tag.name}
                                </button>
                            ))}
                    </div>
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

// ============ LINKS DIALOG ============
function LinksDialog({ 
    projectId, 
    projectName, 
    links: initialLinks,
    availableLinks 
}: { 
    projectId: string
    projectName: string
    links: ProjectLink[]
    availableLinks: Link[]
}) {
    const [links, setLinks] = useState<ProjectLink[]>(initialLinks)
    const [newLinkId, setNewLinkId] = useState('')
    const [newLinkUrl, setNewLinkUrl] = useState('')
    const [adding, setAdding] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)

    async function handleAddLink() {
        if (adding || !newLinkId || !newLinkUrl) return
        if (links.some((l) => l.link_id === newLinkId)) {
            toast.error('This link type already exists')
            return
        }

        const linkName = availableLinks.find((l: Link) => l.id === newLinkId)?.name || ''

        try {
            setAdding(true)
            const res = await fetch(`/api/projects/${projectId}/links`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ link_id: newLinkId, url: newLinkUrl }),
            })
            if (!res.ok) throw new Error('Failed to add link')
            const created = await res.json()
            setLinks((prev) => [...prev, { id: created.id, link_id: newLinkId, name: linkName, url: newLinkUrl }])
            setNewLinkId('')
            setNewLinkUrl('')
            toast.success('Link added successfully')
        } catch (err: any) {
            toast.error('Error adding link: ' + err.message)
        } finally {
            setAdding(false)
        }
    }

    async function handleRemoveLink(projectLinkId: string) {
        if (deleting) return
        if (!confirm('Remove this link?')) return

        try {
            setDeleting(projectLinkId)
            const res = await fetch(`/api/projects/${projectId}/links/${projectLinkId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to remove link')
            setLinks((prev) => prev.filter((l) => l.id !== projectLinkId))
            toast.success('Link removed successfully')
        } catch (err: any) {
            toast.error('Error removing link: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    const unusedLinks = availableLinks.filter((link: Link) => !links.some((l) => l.link_id === link.id))

    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Links - {projectName}</DialogTitle>
                <DialogDescription>Manage links for this project</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Current Links</h4>
                    {links.length === 0 ? (
                        <p className="text-sm text-gray-400">No links yet</p>
                    ) : (
                        <div className="space-y-2">
                            {links.map((link) => (
                                <div key={link.id} className="flex items-center gap-2 p-2 bg-white/5 rounded-md">
                                    <span className="text-sm font-medium w-24">{link.name}</span>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-400 hover:underline truncate flex-1"
                                    >
                                        {link.url}
                                    </a>
                                    <button
                                        onClick={() => handleRemoveLink(link.id)}
                                        disabled={deleting === link.id}
                                        className="p-1 hover:bg-red-600/50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {unusedLinks.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium mb-2">Add Link</h4>
                        <div className="flex gap-2 mb-2">
                            <select
                                value={newLinkId}
                                onChange={(e) => setNewLinkId(e.target.value)}
                                className="rounded-md border border-white/40 bg-transparent px-3 py-2 text-sm"
                            >
                                <option value="" className="bg-black">Select type...</option>
                                {unusedLinks.map((link: Link) => (
                                    <option key={link.id} value={link.id} className="bg-black">
                                        {link.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {newLinkId && (
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={newLinkUrl}
                                    onChange={(e) => setNewLinkUrl(e.target.value)}
                                    className="flex-1 rounded-md border border-white/40 bg-transparent px-3 py-2 text-sm"
                                />
                                <Button onClick={handleAddLink} disabled={adding || !newLinkUrl} size="sm">
                                    {adding ? 'Adding...' : 'Add'}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

// ============ MAIN TABLE ============
export default function ProjectsTable() {
    const [projects, setProjects] = useState<Project[]>([])
    const [availableTags, setAvailableTags] = useState<Tag[]>([])
    const [availableLinks, setAvailableLinks] = useState<Link[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    async function fetchData() {
        try {
            setLoading(true)
            setError(null)
            const [projectsRes, tagsRes, linksRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/tags'),
                fetch('/api/links'),
            ])
            if (!projectsRes.ok) throw new Error('Failed to fetch projects')
            if (!tagsRes.ok) throw new Error('Failed to fetch tags')
            if (!linksRes.ok) throw new Error('Failed to fetch links')
            
            const [projectsData, tagsData, linksData] = await Promise.all([
                projectsRes.json(),
                tagsRes.json(),
                linksRes.json(),
            ])
            
            // Transform projects data to match our interface
            const transformedProjects = projectsData.map((p: any) => ({
                id: p.id,
                name: p.name,
                year: p.year,
                description: p.description,
                project_logo_url: p.project_logo_url || null,
                images: p.images || [],
                tags: p.tags || [],
                links: p.links || [],
            }))
            
            setProjects(transformedProjects)
            setAvailableTags(tagsData)
            setAvailableLinks(linksData)
        } catch (err: any) {
            setError(err.message || 'Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function handleDelete(projectId: string) {
        if (deleting) return
        if (!confirm('Delete this project? This will also delete all associated images, tags, and links.')) return

        try {
            setDeleting(projectId)
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete')
            setProjects((prev) => prev.filter((p) => p.id !== projectId))
            toast.success('Project deleted successfully')
        } catch (err: any) {
            toast.error('Error deleting project: ' + err.message)
        } finally {
            setDeleting(null)
        }
    }

    function handleSuccess() {
        setDialogOpen(false)
        fetchData()
    }

    function handleEditSuccess() {
        setEditDialogOpen(false)
        setEditingProject(null)
        fetchData()
    }

    function openEditDialog(project: Project) {
        setEditingProject(project)
        setEditDialogOpen(true)
    }

    return (
        <div>
            <div className="flex mt-8 mb-4 items-center">
                <h2 className="text-xl">Projects</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <button className="ml-auto px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors text-white">
                            Add Project
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add Project</DialogTitle>
                            <DialogDescription>
                                Fill the form to add a new project with images, tags, and links.
                            </DialogDescription>
                        </DialogHeader>

                        {dialogOpen && (
                            <ProjectForm 
                                key={dialogOpen ? 'open' : 'closed'}
                                onSuccess={handleSuccess}
                                availableTags={availableTags}
                                availableLinks={availableLinks}
                            />
                        )}

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
                        <th>Logo</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>Tags</th>
                        <th>Links</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={8} className="text-center py-8 text-gray-400">
                                Loading projects...
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan={8} className="text-center py-8 text-red-500 bg-red-500/10">
                                {error}
                            </td>
                        </tr>
                    )}
                    {!loading && !error && projects.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center py-8 text-gray-400">
                                No projects found
                            </td>
                        </tr>
                    )}
                    {!loading && !error && projects.map((project) => (
                        <tr key={project.id} className="[&>td]:border [&>td]:border-gray-700 [&>td]:px-4 [&>td]:py-2">
                            <td>{project.name}</td>
                            <td>
                                {project.project_logo_url ? (
                                    <img 
                                        src={project.project_logo_url} 
                                        alt={`${project.name} logo`}
                                        className="w-8 h-8 object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-500">-</span>
                                )}
                            </td>
                            <td>{project.year}</td>
                            <td className="max-w-xs truncate">{project.description}</td>
                            <td>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="px-3 py-1 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors text-white text-sm">
                                            View ({project.images.length})
                                        </button>
                                    </DialogTrigger>
                                    <ImagesDialog
                                        projectId={project.id}
                                        projectName={project.name}
                                        images={project.images}
                                    />
                                </Dialog>
                            </td>
                            <td>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white text-sm">
                                            View ({project.tags.length})
                                        </button>
                                    </DialogTrigger>
                                    <TagsDialog
                                        projectId={project.id}
                                        projectName={project.name}
                                        tags={project.tags.map((t: Tag) => ({ id: t.id, tag_id: t.id, name: t.name }))}
                                        availableTags={availableTags}
                                    />
                                </Dialog>
                            </td>
                            <td>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="px-3 py-1 bg-teal-600 rounded-md hover:bg-teal-700 transition-colors text-white text-sm">
                                            View ({project.links.length})
                                        </button>
                                    </DialogTrigger>
                                    <LinksDialog
                                        projectId={project.id}
                                        projectName={project.name}
                                        links={project.links.map((l: { id: string; name: string; url: string }) => ({ id: l.id, link_id: l.id, name: l.name, url: l.url }))}
                                        availableLinks={availableLinks}
                                    />
                                </Dialog>
                            </td>
                            <td>
                                <button 
                                    onClick={() => openEditDialog(project)}
                                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white"
                                >
                                    Modify
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    disabled={deleting === project.id}
                                    className="ml-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-white disabled:opacity-50"
                                >
                                    {deleting === project.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Project Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={(open) => {
                setEditDialogOpen(open)
                if (!open) setEditingProject(null)
            }}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                            Modify the project details below.
                        </DialogDescription>
                    </DialogHeader>

                    {editingProject && (
                        <EditProjectForm
                            project={editingProject}
                            onSuccess={handleEditSuccess}
                        />
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}