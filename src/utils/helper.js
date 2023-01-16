export const findParentIndex = ({ lists, id }) => {
  return lists.findIndex((data) => data.id === id)
}
export const findChildIndex = ({ lists, parentIndex, id }) => {
  return lists[parentIndex].sublist.findIndex((d) => d.id === id)
}
