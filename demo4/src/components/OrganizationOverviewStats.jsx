import parse from 'html-react-parser';
import { iconNodes } from '../icons.js';

const number = value => value == null ? '—' : value.toLocaleString('zh-CN');

function StatIcon({ name }) {
  return <svg className="qingicon" viewBox="0 0 24 24" fill="none" aria-hidden="true">{parse(iconNodes[name])}</svg>;
}

function LiveNumber({ value }) {
  return <span title={value == null ? '暂无实时统计数据' : undefined}>{number(value)}</span>;
}

export function OrganizationOverviewStats({ stats }) {
  if (!stats) return null;
  return (
    <section className="org-management-stats" aria-label="组织管理统计">
      <article className="org-summary-card org-usage-card">
        <div className="org-summary-body">
          <header><h3>使用情况</h3></header>
          <dl className="org-activity-metrics">
            <div><dt>当前实验人数</dt><dd><LiveNumber value={stats.experimenters} /><span className="org-metric-total"> / {number(stats.members)}</span></dd></div>
            <div><dt>运行中的项目</dt><dd><LiveNumber value={stats.runningProjects} /><span className="org-metric-total"> / {number(stats.projects)}</span></dd></div>
            <div><dt>进行中的实验</dt><dd><LiveNumber value={stats.runningExperiments} /><span className="org-metric-total"> / {number(stats.totalExperiments)}</span></dd></div>
          </dl>
        </div>
      </article>
      <article className="org-summary-card">
        <div className="org-summary-body">
          <header><h3><StatIcon name="users" />成员</h3><div className="org-summary-actions"><button className="org-summary-icon" type="button" data-action="invite" aria-label="添加成员" title="添加成员"><StatIcon name="userPlus" /></button><button className="org-summary-icon" type="button" data-action="nav" data-page="members" aria-label="查看成员统计面板" title="查看成员统计面板"><StatIcon name="arrowUpRight" /></button></div></header>
          <div className="org-summary-numbers"><strong>{number(stats.members)}</strong><span>管理员：<b>{number(stats.administrators)}</b></span></div>
        </div>
      </article>
      <article className="org-summary-card">
        <div className="org-summary-body">
          <header><h3><StatIcon name="project" />项目</h3><div className="org-summary-actions"><button className="org-summary-icon" type="button" data-action="create" aria-label="创建项目" title="创建项目"><StatIcon name="plus" /></button><button className="org-summary-icon" type="button" data-action="nav" data-page="projectAdmin" aria-label="查看项目统计面板" title="查看项目统计面板"><StatIcon name="arrowUpRight" /></button></div></header>
          <div className="org-summary-numbers"><strong>{number(stats.projects)}</strong><span>进行中的项目：<b><LiveNumber value={stats.runningProjects} /></b></span></div>
        </div>
      </article>

    </section>
  );
}
