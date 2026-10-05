"use client";
import { useEffect, useRef } from "react";
import { animate, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
export function Reveal({children,className,delay=0}:{children:React.ReactNode;className?:string;delay?:number}) {
 const ref=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 useEffect(()=>{
   if(reduced||!ref.current)return;
   const element=ref.current;
   let animation: ReturnType<typeof animate>|undefined;
   const observer=new IntersectionObserver(entries=>{
     if(entries.some(entry=>entry.isIntersecting)){
       animation=animate(element,{opacity:[.65,1],transform:["translateY(18px)","translateY(0px)"]},{duration:.65,delay,ease:[.2,.7,.2,1]});
       observer.disconnect();
     }
   },{threshold:.12});
   observer.observe(element);
   return ()=>{observer.disconnect();animation?.stop();};
 },[delay,reduced]);
 return <div ref={ref} className={className}>{children}</div>;
}
export function Parallax({children,className}:{children:React.ReactNode;className?:string}) {
 const ref=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
 const y=useTransform(scrollYProgress,[0,1],[-14,14]);
 return <div ref={ref} className={className}><motion.div style={{position:"absolute",inset:reduced?0:"-18px 0",y:reduced?0:y}}>{children}</motion.div></div>;
}