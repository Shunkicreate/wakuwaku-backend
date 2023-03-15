const returnAsync = async () => {
  return await 1
}

const tryPromise = async () => {
  const awaitfunc = (num: number) => { return num }
  console.log(await awaitfunc(1))
  console.log(awaitfunc(2))
  return returnAsync()

}
const a = tryPromise()
console.log(a)
console.log(a.then((a)=>{return a}))

