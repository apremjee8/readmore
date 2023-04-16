async function getData() {
  const headers = new Headers({
    Authorization: `Token ${process.env.READWISE_TOKEN}`,
  });

  const options = {
    method: "GET",
    headers: headers,
  };

  const res = await fetch("https://readwise.io/api/v2/export/", options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  console.log(res);
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div className='flex flex-col space-y-3 w-full p-2'>
      {data.results.map((item) => (
        <div key={item.user_book_id} className='flex flex-col space-y-3'>
          <div className='text-white bg-slate-600 text-lg p-2'>
            Title: {item.title}
          </div>
          <div className='text-white bg-slate-600 text-med p-2'>
            Author: {item.author}
          </div>
          <div className='flex flex-col break-all drop-shadow space-y-3'>
            {item.highlights.map((highlight) => (
              <div key={highlight.id} className='bg-slate-100 p-2'>
                {highlight.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
