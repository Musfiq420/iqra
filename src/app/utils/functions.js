// export const topicList = (chapters, parent, lvl, tempTree) => {
//   const parentID = parent===null?null:parent.toString()
//   let temp = tempTree
//   const children = chapters.filter((e) => e.parent === parentID);
//   children.sort((a,b) => a.index - b.index)

//     children.map((e, i) => {
        
//         temp = topicList(chapters, e._id, lvl+1, [...temp, {id: e._id, title: e.title, parent: e.parent, lvl: lvl, type: e.type, index: i}])
//     })

//   return temp;
      
// }

export const topicList = (chapters, parent, lvl, tempTree) => {
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

export const addFileNo = (chapters) => {
  const temp = chapters;
  let fileNo = 0;
  chapters.map((e, i) => {
    if(e.type === 'file'|| e.type === 'quiz')
    {
      temp[i].fileNo = fileNo;
      fileNo++;
    }
      
  })

  return temp;
}

export const totalFileNo = (chapters) => {
  const temp = chapters;
  let fileNo = 0;
  chapters.map((e, i) => {
    if(e.type === 'file'|| e.type === 'quiz')
    {
      temp[i].fileNo = fileNo;
      fileNo++;
    }
      
  })

  return fileNo;
}