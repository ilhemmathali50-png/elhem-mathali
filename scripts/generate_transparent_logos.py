#!/usr/bin/env python3
"""Generate the transparent artwork used by the logo gallery.
Derived exclusively from the original source logos kept in this repository.
Never alter originals or the editorial mockup/charte boards.
"""
from pathlib import Path
from PIL import Image
import numpy as np
import cv2

src=Path("assets/logo-showroom")
dest=src/"transparent"
dest.mkdir(parents=True,exist_ok=True)
created=[]

for p in sorted(src.glob("*.webp")):
    if "board" in p.name:
        continue
    im=Image.open(p).convert("RGBA")
    a=np.asarray(im).copy()
    rgb=a[:,:,:3].astype(np.float32)
    h,w=rgb.shape[:2]
    bname=p.stem
    if np.min(a[:,:,3])<255:
        alpha=a[:,:,3].copy()
    else:
        corners=np.array([rgb[0,0],rgb[0,-1],rgb[-1,0],rgb[-1,-1],rgb[4,4],rgb[-5,-5]])
        bg=np.median(corners,axis=0)
        maxdiff=np.max(np.abs(rgb-bg),axis=2)
        if bname=="elya-natura":
            r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
            v=np.minimum((g-75)/42,(b-48)/43)
            alpha=np.uint8(np.clip(v,0,1)*255)
        elif bname=="logo-bio":
            r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
            v=np.minimum((r-53)/34,(g-36)/29)
            v=np.minimum(v,(r-b-16)/22)
            alpha=np.uint8(np.clip(v,0,1)*255)
        elif bname=="forceclean":
            hsv=cv2.cvtColor(rgb.astype(np.uint8),cv2.COLOR_RGB2HSV)
            sat=hsv[:,:,1].astype(float)
            value=hsv[:,:,2].astype(float)
            blue=(hsv[:,:,0]>=88)&(hsv[:,:,0]<=130)&(sat>32)
            green=(hsv[:,:,0]>=32)&(hsv[:,:,0]<=90)&(sat>40)
            dark=value<145
            yy,xx=np.indices((h,w))
            in_logo=(xx>=54)&(xx<=723)&(yy>=348)&(yy<=615)
            ink=((blue|green|dark)&in_logo).astype(np.uint8)*255
            ink=cv2.morphologyEx(ink,cv2.MORPH_CLOSE,np.ones((4,4),np.uint8))
            nlabels,labels,stats,cent=cv2.connectedComponentsWithStats(ink)
            keep=np.zeros((h,w),np.uint8)
            for ix in range(1,nlabels):
                x,y,ww,hh,area=stats[ix]
                if area>=3 and h*.22<y+hh/2<h*.78:
                    keep[labels==ix]=255
            alpha=cv2.GaussianBlur(keep,(3,3),0.7)
        elif bname=="metallux":
            v=np.clip((np.max(np.abs(rgb-np.array([254,254,254],np.float32)),axis=2)-12)/38,0,1)
            yy=np.arange(h)[:,None]
            v[(yy<295).repeat(w,axis=1)|(yy>670).repeat(w,axis=1)]=0
            alpha=(255*v).astype(np.uint8)
        else:
            if bname in ("fait-maison","myfloria-variant","moderno","imangi-studios"):
                lo,hi=11,34
            elif bname in ("goman-tv","tahwissa"):
                lo,hi=8,29
            else:
                lo,hi=7,27
            alpha=np.uint8(255*np.clip((maxdiff-lo)/(hi-lo),0,1))
    a[:,:,3]=alpha
    ys,xs=np.where(alpha>30)
    if len(xs):
        x0,x1=xs.min(),xs.max()+1
        y0,y1=ys.min(),ys.max()+1
        pad=int(round(.045*max(x1-x0,y1-y0)))
        x0=max(0,x0-pad);y0=max(0,y0-pad)
        x1=min(w,x1+pad);y1=min(h,y1+pad)
        a=a[y0:y1,x0:x1]
    Image.fromarray(a,"RGBA").save(dest/(bname+".png"),optimize=True)
    created.append(bname)

for name,box in [
    ("breakfast-news-logo",(157,72,726,410)),
    ("ny-knicks-logo",(205,20,723,422)),
]:
    p=src/(name.replace("-logo","-board")+".webp")
    im=Image.open(p).convert("RGBA")
    raw=np.asarray(im).copy()[box[1]:box[3],box[0]:box[2]]
    rgb=raw[:,:,:3].astype(np.float32)
    r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
    if name=="breakfast-news-logo":
        fg=np.minimum((185-np.maximum.reduce([r,g,b]))/47,(195-(r+g+b)/3)/50)
    else:
        fg=np.maximum((183-(r+g+b)/3)/48,(r-g-22)/40)
    alpha=(255*np.clip(fg,0,1)).astype(np.uint8)
    raw[:,:,3]=alpha
    ys,xs=np.where(alpha>40)
    x0,x1=xs.min(),xs.max()+1
    y0,y1=ys.min(),ys.max()+1
    pad=18
    x0=max(0,x0-pad);y0=max(0,y0-pad)
    x1=min(raw.shape[1],x1+pad);y1=min(raw.shape[0],y1+pad)
    Image.fromarray(raw[y0:y1,x0:x1],"RGBA").save(dest/(name+".png"),optimize=True)
    created.append(name)
assert len(created)==27, f"Expected 27 transparent files, got {len(created)}"
print("Generated 27 transparent logo PNGs in",dest)
