import {useRef, useEffect} from 'react';

export function getSectionListData(data) {
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      id: curr.id,
      name: curr.name,
      price: curr.price,
      description: curr.description,
      image: curr.image
    };
     
    if (!Array.isArray(acc[curr.category])) {
      //console.log(curr.category.charAt(0).toUpperCase() + curr.category.slice(1))
      acc[curr.category] = [menuItem];
      //acc[curr.category.charAt(0).toUpperCase() + curr.category.slice(1)] = [menuItem]
    } else {
      acc[curr.category].push(menuItem);
      //acc[curr.category.charAt(0).toUpperCase() + curr.category.slice(1)].push(menuItem)
    }
    return acc;
  }, {});


  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  console.log('Debug: getSectionListData:', sectionListData)
  return sectionListData;
}


export function othergetSectionListData(data) {
  let sectionListData = []
  data.map((item) => {
    let obj = sectionListData.find(x => x.name == item.category.charAt(0).toUpperCase() + item.category.slice(1));
    if (obj) {
      sectionListData[sectionListData.indexOf(obj)].data.push({id: item.id, name: item.name, price: item.price, description: item.description, image: item.image})
    } else {
      sectionListData.push({
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        data:[
          {id: item.id, name: item.name, price: item.price, description: item.description, image: item.image}
        ]
      })
    }});

  console.log('Debug: getSectionListData:', sectionListData)
  return sectionListData;
}



export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}