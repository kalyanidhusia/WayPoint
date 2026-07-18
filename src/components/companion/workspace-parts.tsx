export function WorkspaceTitle({step,title,description,children}:{step:string;title:string;description:string;children?:React.ReactNode}){
 return <div className="companion-title"><div><span>{step}</span><h1>{title}</h1><p>{description}</p></div>{children}</div>;
}
export function Badge({children,tone=""}:{children:React.ReactNode;tone?:string}){return <span className={`data-badge ${tone}`}>{children}</span>}
