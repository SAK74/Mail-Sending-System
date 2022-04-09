const SingleMail = ({ num, subject, content, selected, handleCheck, pending, status }) => {
   return <>
      {/* <input type="checkbox" checked={!!selected} onChange={handleCheck} disabled={pending} /> */}
      {/* {num + 1}.  */}
      {subject} {content} {status}
   </>
}

export default SingleMail;