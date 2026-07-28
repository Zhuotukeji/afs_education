import { ImageResponse } from 'next/og'
import { contentBySlug } from '@/content/catalog'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; type: string }> }) {
  const { slug, type } = await params
  const item = contentBySlug.get(slug)
  const title = item?.title || 'Career Path Brief'
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'64px 72px',background:'#F7F8F5',color:'#18201F'}}><div style={{display:'flex',alignItems:'center',gap:18,fontSize:26,fontWeight:700,color:'#174C43'}}><span style={{display:'flex',width:48,height:48,alignItems:'center',justifyContent:'center',background:'#174C43',color:'white',borderRadius:6,fontSize:15}}>CP</span>Career Path Brief</div><div><div style={{fontSize:21,textTransform:'uppercase',color:'#B3483C',marginBottom:18}}>{type.replaceAll('-',' ')}</div><div style={{fontSize:58,lineHeight:1.08,fontWeight:700,maxWidth:1000}}>{title}</div></div><div style={{display:'flex',justifyContent:'space-between',fontSize:18,color:'#64706D'}}><span>Source-backed career decisions</span><span>Updated 2026</span></div></div>, { width: 1200, height: 630 })
}
