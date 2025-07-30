import ImageManager from '@/components/ImageManager'

export default function ImageManagementPage() {
  return (
    <div className="min-h-screen">
      <ImageManager
        allowUpload={true}
        allowDelete={true}
        allowEdit={true}
      />
    </div>
  )
}
