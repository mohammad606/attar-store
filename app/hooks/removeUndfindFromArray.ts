

export const RemoveUndefinedFromArray = (data:any)=>{
    return  data.filter((item:any, index:number) => {
        return Object.keys(item).length > 0 || index === 0;
    });
}