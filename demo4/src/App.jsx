import parse, { attributesToProps, domToReact } from 'html-react-parser';
import { OrganizationOverviewStats } from './components/OrganizationOverviewStats.jsx';
import { DashboardLayout } from './components/DashboardLayout.jsx';

const options = {
  replace(node) {
    if (node.attribs?.['data-overview-stats']) return <OrganizationOverviewStats stats={JSON.parse(node.attribs['data-overview-stats'])} />;
    if (node.name === 'option') {
      const { selected, ...attributes } = node.attribs;
      return <option {...attributesToProps(attributes)}>{domToReact(node.children, options)}</option>;
    }
    if (node.name === 'select') {
      const selected = [];
      const visit = nodes => nodes.forEach(child => {
        if (child.name === 'option' && 'selected' in child.attribs) selected.push(child.attribs.value ?? child.children.map(item => item.data || '').join(''));
        else if (child.children) visit(child.children);
      });
      visit(node.children);
      const props = attributesToProps(node.attribs);
      return <select {...props} defaultValue={props.multiple ? selected : selected[0]}>{domToReact(node.children, options)}</select>;
    }
    if (node.attribs?.class?.split(/\s+/).includes('shell')) {
      return <DashboardLayout node={node} options={options} />;
    }
  },
};

export function App({ markup }) {
  return <div className="contents">{parse(markup, options)}</div>;
}
