'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import { BACKEND_URL } from '@/src/app/config/env'
import { cn } from '@/src/shared/lib/tailwindUtils'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { Image } from '../Image'

export type IFile = {
  url?: string
  file?: File | null
  id?: string | number
  filename?: string
}

type Props = {
  value: IFile[]
  maxFiles?: number
  acceptedExt?: string[]
  maxFileSize?: number
  disabled?: boolean
  onChange: (files: IFile[]) => void
}

export default function FileUploader({
  value = [],
  onChange,
  acceptedExt = ['.jpg', '.jpeg', '.png', '.svg'],
  maxFileSize = 2e6, // 10 Mb
  maxFiles = 1, // 0 - no limit on the number of files
  disabled = false,
}: Props) {
  const t = useTranslations('Common')

  const normalizeFileUrl = (url?: string) => {
    if (!url) return ''

    if (url.startsWith('blob:') || url.startsWith('data:')) return url

    if (/^https?:\/\//.test(url)) return url

    return `${BACKEND_URL}${url}`
  }

  const customErrors: {
    [key: string]: string
  } = {
    'too-many-files': t('fields.validation.too-many-files'),
    'file-invalid-type': t('fields.validation.file-invalid-type'),
    'file-too-large': t('fields.validation.file-too-large'),
    unexpected: t('fields.validation.unexpected'),
  }

  function unsubscribe(url: string | undefined): void {
    if (url) URL.revokeObjectURL(url) // avoiding memory leaks
  }

  function onAccepted<T extends File>(acceptedFiles: T[]) {
    if (maxFiles !== 0 && maxFiles !== 1 && value.length >= maxFiles) {
      toast.error(customErrors['too-many-files'])

      return
    }

    const newFiles = [...value]

    Object.values(acceptedFiles).forEach((file) => {
      const fileUrl = URL.createObjectURL(file)

      newFiles.push({
        url: fileUrl,
        filename: file.name,
        file,
        id: '',
      })
    })

    if (maxFiles === 1) return onChange(newFiles.length === 2 ? [newFiles[1]] : newFiles)

    onChange(newFiles)
  }

  function onRejected(innerFiles: FileRejection[]) {
    const firstFileErrorFirstCode = innerFiles[0].errors[0].code

    toast.error(customErrors[firstFileErrorFirstCode] || customErrors.unexpected)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': acceptedExt,
    },

    maxFiles,
    maxSize: maxFileSize,

    onDropAccepted: (acceptedFiles) => onAccepted(acceptedFiles),
    onDropRejected: (rejectedFiles) => onRejected(rejectedFiles),
  })

  function handleRemove(e: React.SyntheticEvent, url: string | undefined) {
    e.preventDefault()
    unsubscribe(url)

    const filteredFiles = value.filter((item) => item.url !== url)

    onChange(filteredFiles)
  }

  return (
    <div>
      {!disabled && (
        <div
          className={cn(
            'flex min-h-28 items-center justify-center rounded-2lg border border-dashed border-supportive-primary bg-surface-secondary p-5 outline-none transition-all',
            {
              'ring-2 ring-accent-300': isDragActive,
            },
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <div className="-m-3 mx-auto flex flex-wrap items-center justify-center">
            <div className="max-w-60 p-3 text-center text-xs text-text-primary">
              <span>{t('actions.uploadDrag')}</span>
            </div>

            <div className="p-3">
              <Button variant="fourth" size="sm">
                {t('actions.upload')}
              </Button>
            </div>

            <div className="p-3 text-center text-xs text-text-primary">
              <span>{acceptedExt.map((item) => item.substring(1)).join(', ')}</span>
            </div>
          </div>
        </div>
      )}

      {!!value.length && (
        <div className="-m-1 flex flex-wrap pt-3 only:pt-2">
          {value.map((file) => (
            <div className="p-1" key={file.url}>
              <div className="relative size-16 overflow-hidden rounded-md max-lg:size-14">
                <Image
                  quality={90}
                  fillParent
                  width={64}
                  height={64}
                  src={normalizeFileUrl(file?.url)}
                  alt="avatar"
                />

                {!disabled && (
                  <a
                    className="absolute right-0 top-0 flex size-6 items-center justify-center text-black transition-colors hover:text-red-strong active:text-black"
                    href="#"
                    onClick={(e) => handleRemove(e, file.url)}
                  >
                    <Icon name="outlined/cross" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
