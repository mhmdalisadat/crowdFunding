// eslint-disable-next-line import/no-extraneous-dependencies
import DOMPurify from "dompurify";

export const ParsHTML = (content) => {
  let dataReplace = content;
  if (content !== undefined && !content.includes("table-fixed")) {
    dataReplace = dataReplace.replace(
      /<table/g,
      '<table className="table-fixed border-separate border border-slate-500"'
    );
    dataReplace = dataReplace.replace(
      /<td/g,
      '<td className="border border-slate-700 p-2 m-2 border-indigo-500/50"'
    );
  }
  if(dataReplace !== undefined){
    dataReplace = dataReplace.replace(/&lt;/g, '<')
  }
  if(dataReplace !== undefined){
    dataReplace = dataReplace.replace(/&gt;/g, '>')
  }
  const sanitizedHtml = DOMPurify.sanitize(dataReplace);
  return { __html: sanitizedHtml };

};
