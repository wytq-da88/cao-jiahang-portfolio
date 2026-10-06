'use client';
import { motion,useScroll,useTransform } from 'framer-motion';
import { useReadingMotion } from './MotionProvider.jsx';
export default function MotionStage({children}){
  const {animated}=useReadingMotion();
  const {scrollY}=useScroll();
  const y=useTransform(scrollY,[0,650],[0,28]);
  return <motion.div className="product-motion" initial={false} style={{y:animated?y:0,willChange:animated?'transform':'auto'}}>{children}</motion.div>;
}
