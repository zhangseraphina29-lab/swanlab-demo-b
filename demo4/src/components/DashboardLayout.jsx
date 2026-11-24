import { Fragment } from 'react';
import { attributesToProps, domToReact } from 'html-react-parser';

const hasClass = (node, name) => node.attribs?.class?.split(/\s+/).includes(name);
const elements = node => node?.children?.filter(child => child.type === 'tag') || [];

function Header({ node, brand, account, accountPage, renderNodes }) {
  const children = node.children.map((child, index) => {
    if (hasClass(child, 'crumb') && accountPage) {
      return (
        <nav key={index} className="crumb" aria-label="面包屑">
          <button data-action="nav" data-page="projects" className="crumb-link back-dashboard">
            <svg className="lucide lucide-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 19-7-7 7-7M5 12h14" />
            </svg>
            {' Back to dashboard'}
          </button>
        </nav>
      );
    }
    if (hasClass(child, 'topbar-actions')) {
      return (
        <div key={index} {...attributesToProps(child.attribs)}>
          {renderNodes(child.children)}
          {account && <button {...attributesToProps(account.attribs)} className={`${account.attribs.class} header-account`}>{renderNodes(account.children)}</button>}
        </div>
      );
    }
    return <Fragment key={index}>{renderNodes([child])}</Fragment>;
  });
  return (
    <header {...attributesToProps(node.attribs)}>
      <div {...attributesToProps(brand.attribs)} className="header-brand" hidden={accountPage}>
        {renderNodes(brand.children.filter(child => !hasClass(child, 'sidebar-toggle')))}
      </div>
      {children}
    </header>
  );
}

function Sidebar({ node, accountPage, renderNodes }) {
  return (
    <aside {...attributesToProps(node.attribs)} hidden={accountPage}>
      {node.children.filter(child => !hasClass(child, 'brand')).map((child, index) =>
        hasClass(child, 'sidebottom') ? (
          <div key={index} {...attributesToProps(child.attribs)}>
            {renderNodes(child.children.filter(item => !hasClass(item, 'account')))}
          </div>
        ) : <Fragment key={index}>{renderNodes([child])}</Fragment>
      )}
    </aside>
  );
}

export function DashboardLayout({ node, options }) {
  const children = elements(node);
  const sidebar = children.find(child => hasClass(child, 'sidebar'));
  const main = children.find(child => hasClass(child, 'main'));
  const header = elements(main).find(child => hasClass(child, 'topbar'));
  const content = elements(main).find(child => hasClass(child, 'content'));
  const brand = elements(sidebar).find(child => hasClass(child, 'brand'));
  const bottom = elements(sidebar).find(child => hasClass(child, 'sidebottom'));
  const account = elements(bottom).find(child => hasClass(child, 'account'));
  const accountPage = ['account', 'security', 'developer', 'myOrganizations'].some(page => hasClass(content, `page-${page}`));
  const renderNodes = nodes => domToReact(nodes, options);

  return (
    <div {...attributesToProps(node.attribs)} className={`${node.attribs.class}${accountPage ? ' account-shell' : ''}`}>
      <Header node={header} brand={brand} account={account} accountPage={accountPage} renderNodes={renderNodes} />
      <Sidebar node={sidebar} accountPage={accountPage} renderNodes={renderNodes} />
      <main {...attributesToProps(main.attribs)}>
        {renderNodes(main.children.filter(child => child !== header))}
      </main>
    </div>
  );
}
