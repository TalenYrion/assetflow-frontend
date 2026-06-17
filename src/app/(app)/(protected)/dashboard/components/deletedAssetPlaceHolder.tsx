import { ImageOff, FileArchive, Box, FileX } from 'lucide-react';

export function DeletedAssetPlaceholder({ fileExtension }: { fileExtension: string }) {
  // 1. Determine which icon to show based on the extension you saved
  let Icon = FileX;
  if (['.png', '.jpg', '.jpeg', '.webp'].includes(fileExtension.toLowerCase())) {
    Icon = ImageOff;
  } else if (['.zip', '.rar'].includes(fileExtension.toLowerCase())) {
    Icon = FileArchive;
  } else if (['.obj', '.fbx', '.gltf'].includes(fileExtension.toLowerCase())) {
    Icon = Box;
  }

  // 2. Render a premium "Ghost" container using Tailwind
  return (
    <div className="h-14 w-14 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-center shrink-0 text-neutral-400 opacity-60">
      <Icon className="h-6 w-6 stroke-[1.5]" />
    </div>
  );
}
