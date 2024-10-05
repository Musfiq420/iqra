import db from '@/lib/mongodb';
import React from 'react'
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import ChapterList from './components/chapters';
import { LexoRank } from 'lexorank';

const topicList = (chapters, parent, lvl, tempTree) => {
  const parentID = parent===null?null:parent.toString()
  let temp = tempTree
  const children = chapters.filter((e) => e.parent === parentID);
  children.sort((a,b) => {
    if(a.index > b.index)
      return 1
    else 
      return -1
  
  })

    children.map((e, i) => {
        
        temp = topicList(chapters, e._id, lvl+1, [...temp, {id: e._id, title: e.title, parent: e.parent, lvl: lvl, type: e.type, index: i, rank:e.index}])
    })

  return temp;
      
}





const Course = async ({params}) => {
  const course = await db.collection("courses").findOne({_id: new ObjectId(params.course)})
  const nodes = await db.collection("nodes").find({course:params.course}).toArray();
  
  const chapters = topicList(nodes, null, 0, []);

  const handleSort = async(dragNode, dragOverNode, dragOverIdx, dragOverSiblings) => {
    'use server'
    
    const dragID = dragNode._id;
    const dragOverID = dragOverNode._id;
    const dragIndex = dragNode.index;
    const dragOverIndex = dragOverNode.index;
    const parentID = dragOverNode.parent;

    let index;
    console.log("IDX: "+dragOverIdx)
    if(dragOverIdx === 0)
    {
      
      index = LexoRank.parse(dragOverNode.index).genPrev()
    }
    // else if(dragOverIdx === dragOverSiblings.length)
    // {
    //   index = LexoRank.parse(dragOverSiblings[dragOverIndex-1].index).genNext();
    // }
    else {
      index = LexoRank.parse(dragOverSiblings[dragOverIdx-1].index).between(LexoRank.parse(dragOverNode.index));
    }

    await db.collection("nodes").updateOne({_id : new ObjectId(dragNode._id)}, { $set: {index: index.toString(), parent: dragOverNode.parent}});
    revalidatePath(`/teacher/${params.course}`);
  
  }
 

  // const moveUp = async(formData) => {
  //   'use server'
  //   const id = formData.get('node');
  //   const parent = formData.get('parent');
  //   const allNodes = await db.collection("nodes").find({course:params.course, parent: parent}).sort( { index : 1 } ).toArray();
  //   let index;
  //   allNodes.forEach((element, i) => {
  //     if(element._id.toString() === id)
  //       index = i
  //   });

  //   if(index>0)
  //   {
  //     const id2 = allNodes[index - 1]._id.toString()
  //     await db.collection("nodes").updateOne({_id : new ObjectId(id)}, { $set: {index: allNodes[index - 1].index}});
  //     await db.collection("nodes").updateOne({_id : new ObjectId(id2)}, { $set: {index: allNodes[index].index}}  )
  //   }
    
  //   revalidatePath(`/teacher/${params.course}`);
    
  // }

  // const moveDown = async(formData) => {
  //   'use server'
  //   const id = formData.get('node');
  //   const parent = formData.get('parent');
  //   const allNodes = await db.collection("nodes").find({course:params.course, parent: parent}).sort( { index : 1 } ).toArray();
  //   let index;
  //   allNodes.forEach((element, i) => {
  //     if(element._id.toString() === id)
  //       index = i
  //   });

  //   if(index<allNodes.length-1)
  //   {
  //     const id2 = allNodes[index + 1]._id.toString()
  //     await db.collection("nodes").updateOne({_id : new ObjectId(id)}, { $set: {index: allNodes[index + 1].index}});
  //     await db.collection("nodes").updateOne({_id : new ObjectId(id2)}, { $set: {index: allNodes[index].index}}  )
  //   }
    
  //   revalidatePath(`/teacher/${params.course}`);
    
  // }
 
  

  return (
    <>
      <div style={{height:"100vh"}}>
      <div style={{height:"80px"}} />
      <div style={{fontSize:"24px"}}>{course.title}</div>
      <Link style={{fontWeight:"bold", fontSize:"16px"}} href={`/teacher/${params.course}/add/null`} >Add</Link>
      <div style={{height:"20px"}} />
      <ChapterList chapters={chapters} params={params} handleSort={handleSort} nodes={nodes} />
        {/* {
            chapters.map((e, i) =>             
                <div style={{paddingLeft:`${20+e.lvl*20}px`}}>
                  <div>
                    {e.type==='path'?
                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", padding:"5px", border:"2px solid lightgray", borderRadius:"5px", width:"50%"}}>
                        <FaRegFolder />
                        <span style={{marginLeft:"10px", marginRight:"40px", fontWeight:"bold", fontSize:(10 - e.lvl)*2}} > {e.index+1}. {e.title} </span>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/add/${e.id}`} > Add</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/edit/${e.id}`}> Edit</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/delete/${e.id}`} > Delete</Link>
                        <form style={{padding:"5px"}} action={moveUp}>
                          <input name='node' hidden value={e.id} />
                          <input name='parent' hidden value={e.parent} />
                          <button type="submit">Up</button>
                        </form>
                        <form style={{padding:"5px"}} action={moveDown}>
                          <input name='node' hidden value={e.id} />
                          <input name='parent' hidden value={e.parent} />
                          <button type="submit">Down</button>
                        </form>
                        
                      </div>
                      :
                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", padding:"5px", border:"2px solid lightgray", borderRadius:"5px", width:"50%"}}>
                        <FaRegFile />
                        <Link href={`/teacher/${params.course}/${e.id}`} style={{marginLeft:"10px", marginRight:"40px", fontWeight:"normal", fontSize:14}} > {e.index+1}. {e.title}</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/edit/${e.id}`}> Edit</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/delete/${e.id}`} > Delete</Link>
                        <form style={{padding:"5px"}} action={moveUp}>
                          <input name='node' hidden value={e.id} />
                          <input name='parent' hidden value={e.parent} />
                          <button type="submit">Up</button>
                        </form>
                        <form style={{padding:"5px"}} action={moveDown}>
                          <input name='node' hidden value={e.id} />
                          <input name='parent' hidden value={e.parent} />
                          <button type="submit">Down</button>
                        </form>
                      </div>
                      
                    }
                  </div>
                </div>
                
            )
        }             */}
    </div>
    </>
    
  )
}

export default Course