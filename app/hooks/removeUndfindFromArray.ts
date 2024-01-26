
export const RemoveUndefinedFromArray = (data:any)=>{
    if(Array.isArray(data)){
        return  data.filter((item:any, index:number) => {
            return Object.keys(item).length > 0 || index === 0;
        });
    }else {
        const array =Object.values(data)
        return  array.filter((item:any, index:number) => {
            return Object.keys(item).length > 0 || index === 0;
        });
    }
}
