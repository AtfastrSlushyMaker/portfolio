import { ImageResponse } from "@vercel/og";
export const runtime = "edge";
export async function GET() {
 return new ImageResponse(<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#111111",color:"#fafafa",padding:72}}>
  <div style={{display:"flex",justifyContent:"space-between",fontSize:23}}><span>Software & cloud engineering</span><span>ESPRIT · Final year</span></div>
  <div style={{display:"flex",flexDirection:"column",fontSize:108,lineHeight:1.05,fontWeight:600}}><span>Malek</span><span style={{marginLeft:250,color:"#4169ff"}}>Bsaissa</span></div>
  <div style={{display:"flex",justifyContent:"space-between",fontSize:23}}><span>Seeking an end-of-study internship</span><span>Tunisia</span></div>
 </div>,{width:1200,height:630});
}
