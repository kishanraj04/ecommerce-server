import productSchema from '../../model/product.Model.js'
export const updateStock =async (_id,qty)=>{
    const product = await productSchema.findOne({_id:_id})
    product.stock-=qty
    product.save({validateBeforeSave:false})
}