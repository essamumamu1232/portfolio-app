export default function CodeStreamPreview() {
  return (
    <div className="cs-preview">
      <div className="cs-sidebar">
        <div className="cs-file active">App.tsx</div>
        <div className="cs-file">utils.ts</div>
        <div className="cs-file">store.ts</div>
        <div className="cs-file">types.ts</div>
        <div className="cs-file">DiffViewer.tsx</div>
      </div>
      <div className="cs-editor">
        <div className="cs-line"><span className="cs-ln">1</span><span className="cs-kw">import</span> <span className="cs-id">React</span> <span className="cs-kw">from</span> <span className="cs-str">'react'</span>;</div>
        <div className="cs-line"><span className="cs-ln">2</span><span className="cs-kw">import</span> {'{'} <span className="cs-id">DiffViewer</span> {'}'} <span className="cs-kw">from</span> <span className="cs-str">'./components'</span>;</div>
        <div className="cs-line"><span className="cs-ln">3</span></div>
        <div className="cs-line"><span className="cs-ln">4</span><span className="cs-kw">export function</span> <span className="cs-fn">CodeReview</span>() {'{'}</div>
        <div className="cs-line"><span className="cs-ln">5</span>  <span className="cs-kw">const</span> <span className="cs-id">comments</span> = <span className="cs-fn">useComments</span>();</div>
        <div className="cs-line"><span className="cs-ln">6</span></div>
        <div className="cs-line"><span className="cs-ln">7</span>  <span className="cs-kw">return</span> (</div>
        <div className="cs-line"><span className="cs-ln">8</span>    &lt;<span className="cs-id">div</span> <span className="cs-id">className</span>=<span className="cs-str">"editor"</span>&gt;</div>
        <div className="cs-line cs-diff-add"><span className="cs-ln">9</span><span className="cs-diff-marker">+</span>      &lt;<span className="cs-id">MonacoEditor</span> <span className="cs-id">theme</span>=<span className="cs-str">"vs-dark"</span> /&gt;</div>
        <div className="cs-line cs-diff-del"><span className="cs-ln">10</span><span className="cs-diff-marker">-</span>      &lt;<span className="cs-id">OldEditor</span> <span className="cs-id">theme</span>=<span className="cs-str">"light"</span> /&gt;</div>
        <div className="cs-line"><span className="cs-ln">11</span>      &lt;<span className="cs-id">CommentThread</span> <span className="cs-id">comments</span>={'{comments}'} /&gt;</div>
        <div className="cs-line"><span className="cs-ln">12</span>    &lt;/<span className="cs-id">div</span>&gt;</div>
        <div className="cs-line"><span className="cs-ln">13</span>  );</div>
        <div className="cs-line"><span className="cs-ln">14</span>{'}'}</div>
        <div className="cs-line"><span className="cs-ln">15</span></div>
        <div className="cs-line cs-cmt"><span className="cs-ln">16</span>// TODO: add live cursor tracking</div>
      </div>
    </div>
  )
}
