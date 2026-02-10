"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageZoomModalProps {
	imageSrc: string | null;
	onClose: () => void;
}

export default function ImageZoomModal({
	imageSrc,
	onClose,
}: ImageZoomModalProps) {
	const [zoomLevel, setZoomLevel] = useState(1);
	const [isPanning, setIsPanning] = useState(false);
	const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
	const [startPan, setStartPan] = useState({ x: 0, y: 0 });
	const [initialPinchDistance, setInitialPinchDistance] = useState<
		number | null
	>(null);
	const [initialZoomLevel, setInitialZoomLevel] = useState(1);

	const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
		const dx = touch1.clientX - touch2.clientX;
		const dy = touch1.clientY - touch2.clientY;
		return Math.sqrt(dx * dx + dy * dy);
	};

	const handleZoomIn = () => {
		setZoomLevel((prev) => Math.min(prev + 0.5, 5));
	};

	const handleZoomOut = () => {
		setZoomLevel((prev) => Math.max(prev - 0.5, 1));
		if (zoomLevel <= 1.5) {
			setPanOffset({ x: 0, y: 0 });
		}
	};

	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		if (e.deltaY < 0) {
			handleZoomIn();
		} else {
			handleZoomOut();
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		if (zoomLevel > 1) {
			setIsPanning(true);
			setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isPanning && zoomLevel > 1) {
			setPanOffset({
				x: e.clientX - startPan.x,
				y: e.clientY - startPan.y,
			});
		}
	};

	const handleMouseUp = () => {
		setIsPanning(false);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		if (e.touches.length === 2) {
			// Pinch zoom start
			const distance = getDistance(e.touches[0], e.touches[1]);
			setInitialPinchDistance(distance);
			setInitialZoomLevel(zoomLevel);
			setIsPanning(false);
		} else if (e.touches.length === 1 && zoomLevel > 1) {
			// Pan start
			setIsPanning(true);
			setStartPan({
				x: e.touches[0].clientX - panOffset.x,
				y: e.touches[0].clientY - panOffset.y,
			});
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (e.touches.length === 2 && initialPinchDistance !== null) {
			// Pinch zoom
			e.preventDefault();
			const distance = getDistance(e.touches[0], e.touches[1]);
			const scale = distance / initialPinchDistance;
			const newZoom = Math.min(Math.max(initialZoomLevel * scale, 1), 5);
			setZoomLevel(newZoom);

			if (newZoom <= 1) {
				setPanOffset({ x: 0, y: 0 });
			}
		} else if (isPanning && e.touches.length === 1 && zoomLevel > 1) {
			// Pan
			setPanOffset({
				x: e.touches[0].clientX - startPan.x,
				y: e.touches[0].clientY - startPan.y,
			});
		}
	};

	const handleTouchEnd = () => {
		setIsPanning(false);
		setInitialPinchDistance(null);
	};

	// Reset zoom and pan when image changes
	const handleClose = () => {
		setZoomLevel(1);
		setPanOffset({ x: 0, y: 0 });
		setInitialPinchDistance(null);
		setInitialZoomLevel(1);
		onClose();
	};

	return (
		<AnimatePresence>
			{imageSrc && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center'
					onClick={handleClose}
				>
					<div className='absolute inset-0 flex items-center justify-center p-4'>
						{/* Close Button */}
						<button
							onClick={handleClose}
							className='absolute top-4 right-4 z-30 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 shadow-lg'
						>
							<X size={24} className='text-white' />
						</button>

						{/* Zoom Controls */}
						<div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-neutral-900/90 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30 shadow-2xl'>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleZoomOut();
								}}
								disabled={zoomLevel <= 1}
								className='p-2 hover:bg-neutral-800 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<ZoomOut size={20} className='text-white' />
							</button>
							<div className='flex items-center gap-2 px-3'>
								<div className='w-24 h-1.5 bg-neutral-700 rounded-full overflow-hidden'>
									<div
										className='h-full bg-amber-500 transition-all duration-200'
										style={{ width: `${((zoomLevel - 1) / 4) * 100}%` }}
									/>
								</div>
								<span className='text-white text-sm font-medium min-w-12 text-center'>
									{Math.round(zoomLevel * 100)}%
								</span>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleZoomIn();
								}}
								disabled={zoomLevel >= 5}
								className='p-2 hover:bg-neutral-800 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<ZoomIn size={20} className='text-white' />
							</button>
						</div>

						{/* Hint Text */}
						<div className='absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/20'>
							<p className='text-white text-xs sm:text-sm'>
								<span className='hidden sm:inline'>
									Scroll to zoom • Drag to pan
								</span>
								<span className='sm:hidden'>Pinch to zoom • Drag to pan</span>
							</p>
						</div>

						{/* Zoomable Image */}
						<div
							className='relative w-full h-full flex items-center justify-center overflow-hidden'
							onClick={(e) => e.stopPropagation()}
							onWheel={handleWheel}
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
							onMouseLeave={handleMouseUp}
							onTouchStart={handleTouchStart}
							onTouchMove={handleTouchMove}
							onTouchEnd={handleTouchEnd}
							style={{
								cursor:
									zoomLevel > 1 ? (isPanning ? "grabbing" : "grab") : "default",
							}}
						>
							<img
								src={imageSrc}
								alt='Zoomed view'
								className='max-w-full max-h-full object-contain select-none pointer-events-none'
								style={{
									transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
									transition: isPanning ? "none" : "transform 0.1s ease-out",
								}}
								draggable={false}
							/>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
