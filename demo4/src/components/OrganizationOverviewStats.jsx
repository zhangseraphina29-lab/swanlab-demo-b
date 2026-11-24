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
      <article className="org-summary-card">
        <div className="org-summary-body">
          <header><h3><StatIcon name="users" />成员</h3><button type="button" data-action="invite">添加成员</button></header>
          <div className="org-summary-numbers"><strong>{number(stats.members)}</strong><span>超级管理员：<b>{number(stats.owners)}</b></span></div>
        </div>
        <footer><button type="button" data-action="nav" data-page="members">查看成员统计面板</button></footer>
      </article>
      <article className="org-summary-card">
        <div className="org-summary-body">
          <header><h3><StatIcon name="project" />项目</h3><button type="button" data-action="create">创建项目</button></header>
          <div className="org-summary-numbers"><strong>{number(stats.projects)}</strong><span>进行中的项目：<b><LiveNumber value={stats.runningProjects} /></b></span></div>
        </div>
        <footer><button type="button" data-action="nav" data-page="projectAdmin">查看项目统计面板</button></footer>
      </article>
      <article className="org-summary-card org-usage-card">
        <div className="org-summary-body">
          <header><h3>使用情况</h3></header>
          <dl className="org-activity-metrics">
            <div><dt>当前实验人数</dt><dd><LiveNumber value={stats.experimenters} /></dd></div>
            <div><dt>运行中的项目</dt><dd><LiveNumber value={stats.runningProjects} /></dd></div>
            <div><dt>进行中的实验</dt><dd><LiveNumber value={stats.runningExperiments} /></dd></div>
          </dl>
          {stats.runningExperiments == null && <p className="org-activity-note">实时统计数据暂未接入</p>}
        </div>
        <footer><span>实验总数：<b>{number(stats.totalExperiments)}</b></span></footer>
      </article>
    </section>
  );
}
