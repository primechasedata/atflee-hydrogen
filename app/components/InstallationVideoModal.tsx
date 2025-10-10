import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {IconClose} from '~/components/Icon';

interface InstallationVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export function InstallationVideoModal({
  isOpen,
  onClose,
  videoUrl = 'https://www.youtube.com/embed/RGsUplxPrT0',
}: InstallationVideoModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-black/90 border border-white/10 p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-primary"
                  >
                    How to Install
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-primary flex items-center justify-center transition-colors"
                    aria-label="Close modal"
                  >
                    <IconClose className="w-5 h-5" />
                  </button>
                </div>

                {/* Video Container */}
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`${videoUrl}?autoplay=1&rel=0`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Installation instructions"
                  />
                </div>

                {/* Footer */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-primary/70">
                    Installation takes less than 60 seconds. No tools required.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
