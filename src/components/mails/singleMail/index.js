const SingleMail = ({ num, subject, content, selected, handleCheck, pending, status }) => {
   return <div>
      <input type="checkbox" checked={!!selected} onChange={handleCheck} disabled={pending} />
      {num + 1}. {subject} {content} {status}
   </div>
}

export default SingleMail;