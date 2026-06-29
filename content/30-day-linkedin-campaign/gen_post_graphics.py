#!/usr/bin/env python3
import os, html, cairosvg
OUT = "/sessions/festive-dazzling-mayer/mnt/Portfolio website/public/social"
os.makedirs(OUT, exist_ok=True)
W = H = 1200
BG="#0B1220"; PANEL="#0F1A2E"; WHITE="#F8FAFC"; MUTE="#94A3B8"; FAINT="#1E2A41"
PILLARS={"P1":("AWS Architecture","#F59E0B"),"P2":("Kubernetes / EKS","#3B82F6"),
"P3":("IaC / CI-CD / GitOps","#8B5CF6"),"P4":("Observability / SRE","#14B8A6"),
"P5":("FinOps","#22C55E"),"P6":("Security / DevSecOps","#EF4444"),"P7":("Career","#06B6D4")}
POSTS={
 1:("P7","Open to work","Senior DevOps Engineer.\nOpen to work.","4+ yrs · AWS · Kubernetes · Terraform"),
 2:("P5","Mini case study","I cut an AWS bill by\n$8,000 a month.","-32% · zero workloads deleted"),
 3:("P2","War story","The OOMKilled\nmystery.","Requests schedule you. Limits keep you alive."),
 4:("P3","How-to","One Terraform module.\n6 days saved.","1 week to 1 day · 65% faster"),
 5:("P4","War story","The 3am page that\ntaught me MTTR.","MTTR cut 50%"),
 6:("P1","Teardown","The multi-account\nLanding Zone.","4 accounts · one blast-radius wall"),
 7:("P2","X vs Y","Cluster Autoscaler\nvs Karpenter.","Karpenter picks the boxes"),
 8:("P6","Checklist","7 things I find in\nevery cluster audit.","Fix it at admission time"),
 9:("P3","Mistake to lesson","We deployed to prod\nby hand. Then ArgoCD.","Rollback 45m to 5m"),
 10:("P4","How-to","Alerts people\ndon't ignore.","-80% alert volume, more trust"),
 11:("P5","Myth-buster","Spot is too risky\nfor production?","Design for the 2-minute notice"),
 12:("P1","War story","The NAT Gateway bill\nnobody expected.","VPC endpoints take traffic off the bill"),
 13:("P2","Teardown","Zero-downtime\nreleases on EKS.","Rollback = a 5-minute traffic flip"),
 14:("P3","How-to","From 2-week releases\nto 3 days.","85% faster · fewer defects"),
 15:("P7","Availability","What I'd fix in\nyour first week.","Cost · reliability · deploy speed"),
 16:("P4","War story","The failover that\nwasn't tested.","DR you never run is a hope"),
 17:("P6","Mistake to lesson","The IAM policy that\nwas just  *","0 critical findings on audit"),
 18:("P1","Checklist","VPC design mistakes\nI keep seeing.","Plan your CIDRs for 10x"),
 19:("P2","Myth-buster","Kubernetes is\noverkill?","Complexity is a budget, not a verdict"),
 20:("P3","Teardown","Terraform modules\nthat actually scale.","Zero config drift"),
 21:("P5","Mini case study","Right-sizing without\nbreaking prod.","p95 / p99 - never averages"),
 22:("P4","How-to","The 4 signals that\nactually matter.","Latency · Traffic · Errors · Saturation"),
 23:("P1","War story","The Transit Gateway\nrouting loop.","Cloud networking fails silently"),
 24:("P2","How-to","HPA done right.","Scale on the signal, not on CPU"),
 25:("P6","Checklist","The secrets\nmanagement ladder.","Shrink what a leak is worth"),
 26:("P3","War story","The drift that\nbroke prod.","Git is the only source of truth"),
 27:("P4","Teardown","The runbook that cut\nonboarding 3 weeks.","Docs are a force multiplier"),
 28:("P2","X vs Y","ECS vs EKS -\nthe honest take.","The least platform that solves it"),
 29:("P1","Mini case study","How 99.95% uptime\nactually happens.","99.95% is about 4 hours/year"),
 30:("P7","Availability","30 days.\nWhat I learned.","Open to remote · contract · freelance"),
}
NAME="Venkatesh Sethumurugan"; ROLE="Senior Cloud / DevOps Engineer"
SITE="venkatesh-portfolio-website.vercel.app"
def esc(s): return html.escape(s, quote=True)
def wrap(text,mc):
    out=[]
    for para in text.split("\n"):
        line=""
        for w in para.split(" "):
            if len(line)+len(w)+1<=mc: line=(line+" "+w).strip()
            else: out.append(line); line=w
        out.append(line)
    return out
def svg_for(day):
    pillar,fmt,headline,metric=POSTS[day]; plabel,accent=PILLARS[pillar]
    lines=wrap(headline,20)
    fs=92 if max(len(l) for l in lines)<=15 else 80
    lh=fs+18; start_y=470-(len(lines)-1)*lh/2
    head="".join(f'<tspan x="96" y="{start_y+i*lh:.0f}">{esc(l)}</tspan>' for i,l in enumerate(lines))
    pill_w=60+len(plabel)*15.5
    tags=["AWS","Kubernetes","Terraform","GitOps","SRE"]; tx=96; tg=""
    for t in tags:
        tw=34+len(t)*11.5
        tg+=(f'<rect x="{tx:.0f}" y="1020" width="{tw:.0f}" height="46" rx="23" fill="none" stroke="{FAINT}" stroke-width="1.5"/>'
             f'<text x="{tx+tw/2:.0f}" y="1050" font-family="DejaVu Sans, Arial, sans-serif" font-size="22" fill="{MUTE}" text-anchor="middle">{t}</text>')
        tx+=tw+16
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<rect width="{W}" height="{H}" fill="{BG}"/>
<rect x="40" y="40" width="{W-80}" height="{H-80}" rx="28" fill="{PANEL}" stroke="{FAINT}" stroke-width="1.5"/>
<rect x="40" y="40" width="10" height="{H-80}" rx="5" fill="{accent}"/>
<circle cx="1090" cy="150" r="220" fill="{accent}" opacity="0.06"/>
<circle cx="1090" cy="150" r="140" fill="{accent}" opacity="0.05"/>
<rect x="96" y="104" width="{pill_w:.0f}" height="56" rx="28" fill="{accent}" opacity="0.16"/>
<text x="{96+pill_w/2:.0f}" y="140" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" font-weight="bold" fill="{accent}" text-anchor="middle">{esc(plabel)}</text>
<text x="1104" y="132" font-family="DejaVu Sans Mono, monospace" font-size="30" font-weight="bold" fill="{WHITE}" text-anchor="end">DAY {day:02d}</text>
<text x="1104" y="166" font-family="DejaVu Sans Mono, monospace" font-size="22" fill="{MUTE}" text-anchor="end">/ 30 · {esc(fmt)}</text>
<text font-family="DejaVu Sans, Arial, sans-serif" font-size="{fs}" font-weight="bold" fill="{WHITE}">{head}</text>
<rect x="96" y="640" width="64" height="6" rx="3" fill="{accent}"/>
<text x="96" y="726" font-family="DejaVu Sans, Arial, sans-serif" font-size="40" font-weight="bold" fill="{accent}">{esc(metric)}</text>
<line x1="96" y1="900" x2="1104" y2="900" stroke="{FAINT}" stroke-width="1.5"/>
<text x="96" y="952" font-family="DejaVu Sans, Arial, sans-serif" font-size="34" font-weight="bold" fill="{WHITE}">{esc(NAME)}</text>
<text x="96" y="988" font-family="DejaVu Sans, Arial, sans-serif" font-size="25" fill="{MUTE}">{esc(ROLE)}</text>
<text x="1104" y="970" font-family="DejaVu Sans Mono, monospace" font-size="23" fill="{accent}" text-anchor="end">{esc(SITE)}</text>
{tg}
</svg>'''
n=0
for d in range(1,31):
    s=svg_for(d); base=f"{OUT}/day-{d:02d}"
    open(base+".svg","w").write(s)
    cairosvg.svg2png(bytestring=s.encode(),write_to=base+".png",output_width=1200,output_height=1200); n+=1
print(f"generated {n} graphics in {OUT}")
