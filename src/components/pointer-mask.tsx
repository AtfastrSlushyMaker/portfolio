"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePortfolioMotion } from "./motion-provider";

/** A decorative duplicate is masked; the original heading always stays visible. */
export function PointerMask({as:Tag="h2",id,className,children}:{as?:"h1"|"h2";id?:string;className?:string;children:ReactNode}) {
  const ref=useRef<HTMLHeadingElement>(null);
  const {enabled}=usePortfolioMotion();
  useEffect(()=>{
    const heading=ref.current;
    const host=heading?.parentElement;
    if(!enabled||!heading||!host||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;
    let frame=0,inside=false,last=0;
    const target={x:0,y:0},current={x:0,y:0};
    const paint=()=>{heading.style.setProperty('--mask-x',`${current.x}px`);heading.style.setProperty('--mask-y',`${current.y}px`);};
    const step=(now:number)=>{
      frame=0;
      if(!inside||document.hidden)return;
      const amount=1-Math.exp(-Math.min(now-last,40)/65);last=now;
      current.x+=(target.x-current.x)*amount;current.y+=(target.y-current.y)*amount;paint();
      if(Math.abs(target.x-current.x)+Math.abs(target.y-current.y)>.15)frame=requestAnimationFrame(step);
    };
    const move=(event:PointerEvent)=>{
      if(event.pointerType!=="mouse"&&event.pointerType!=="pen")return;
      const bounds=heading.getBoundingClientRect();
      target.x=event.clientX-bounds.left;target.y=event.clientY-bounds.top;
      if(!inside){inside=true;current.x=target.x;current.y=target.y;paint();heading.dataset.maskActive='true';}
      if(!frame){last=performance.now();frame=requestAnimationFrame(step);}
    };
    const leave=()=>{inside=false;delete heading.dataset.maskActive;cancelAnimationFrame(frame);frame=0;};
    host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',leave);
    window.addEventListener('scroll',leave,{passive:true});window.addEventListener('blur',leave);
    return()=>{leave();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);window.removeEventListener('scroll',leave);window.removeEventListener('blur',leave);};
  },[enabled]);
  return <Tag ref={ref} id={id} className={`pointer-mask ${className??""}`}><span className="pointer-mask__base">{children}</span><span className="pointer-mask__layer" aria-hidden="true">{children}</span></Tag>;
}
