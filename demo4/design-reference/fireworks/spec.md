# Fireworks AI · 应用主题色与组件规范

> 提取来源：`https://app.fireworks.ai`（公开 CSS bundle 5 个 / 302KB + 登录页真实 DOM 计算样式）
> 提取时间：2025-11-20　·　原始数据：`tokens.json`

## 0. 一句话总结

Fireworks 的界面是 **"衬线大标题 + 无衬线 UI + 梅紫(bloom)主色 + 橙(orange)品牌点缀"**：
`bloom` 承担主行动色（主按钮/链接/输入聚焦），`orange` 只做 logo 第二色与 tag 强调，
大面积背景用 `gray` / `neutral` 近乎中性的灰阶，圆角 8px 为主，阴影极轻。

## 1. 色板（10 个家族）

### bloom（主色 · 品红/梅紫）
| 级 | Hex |
|---|---|
| 50 | `#FFEBF7` |
| 100 | `#FFC0E7` |
| 200 | `#F69AD1` |
| 300 | `#F776C7` |
| 400 | `#E94BB4` |
| 500 | `#A71E7E` |
| 600 | `#7A155C` |
| 700 | `#610A45` |
| 800 | `#4D0F31` |
| 900 | `#330B21` |
| 950 | `#280016` |

### orange（品牌点缀）
| 级 | Hex |
|---|---|
| 50 | `#FFF7E8` |
| 100 | `#FFDB9F` |
| 300 | `#FFBA50` |
| 500 | `#F98D00` |
| 700 | `#8E3101` |

### gray（UI 灰阶，带极轻微暖调）
| 级 | Hex |
|---|---|
| 50 | `#FBFBFB` |
| 100 | `#F6F6F6` |
| 200 | `#EEEEEE` |
| 300 | `#E4E4E4` |
| 400 | `#D0D0D0` |
| 500 | `#B8B8B8` |
| 600 | `#787878` |
| 700 | `#595959` |
| 750 | `#414141` |
| 800 | `#2A2A2A` |
| 900 | `#1E1D1B` |

### neutral（暖灰，用于大面积分区）
| 级 | Hex |
|---|---|
| 50 | `#F9F7F5` |
| 100 | `#F4F0EC` |
| 200 | `#E2DDD8` |
| 300 | `#DAD5CF` |
| 400 | `#C9C2C2` |
| 500 | `#BDB6AF` |
| 600 | `#A69F9B` |
| 700 | `#857979` |
| 800 | `#706666` |
| 900 | `#574950` |
| 950 | `#4B3F42` |

### 其余家族速查
| 家族 | 级数 | 关键值 |
|---|---|---|
| plum（深梅，正文/深底） | 11 | 50=`#FEF1F9` · 700=`None` · 950=`None` |
| glow（暖橙红，渐变/高光） | 11 | 400=`None` · 600=`None` |
| flare（高饱和粉红，强调/图表） | 12 | 450=`None` · 600=`None` |
| blue（信息） | 5 | 500=`None` |
| green（成功） | 5 | 500=`None` |
| red（错误/危险） | 5 | 500=`None` |

## 2. 语义 Token（应用层真正用的那一层，共 32 个）

| Token | 引用 | Hex |
|---|---|---|
| `--background` | `var(--white)` | `#FFFFFF` |
| `--background-secondary` | `var(--gray-200)` | `#EEEEEE` |
| `--background-tertiary` | `var(--gray-300)` | `#E4E4E4` |
| `--surface` | `var(--white)` | `#FFFFFF` |
| `--foreground` | `var(--gray-900)` | `#1E1D1B` |
| `--foreground-secondary` | `var(--gray-700)` | `#595959` |
| `--muted` | `var(--gray-500)` | `#B8B8B8` |
| `--muted-foreground` | `var(--gray-800)` | `#2A2A2A` |
| `--accent` | `var(--gray-500)` | `#B8B8B8` |
| `--accent-foreground` | `var(--gray-800)` | `#2A2A2A` |
| `--border` | `var(--gray-300)` | `#E4E4E4` |
| `--input` | `var(--white)` | `#FFFFFF` |
| `--input-foreground` | `var(--gray-800)` | `#2A2A2A` |
| `--input-border` | `var(--gray-500)` | `#B8B8B8` |
| `--input-active` | `var(--bloom-600)` | `#7A155C` |
| `--card` | `0 0% 100%` | `0 0% 100%` |
| `--card-foreground` | `240 10% 3.9%` | `240 10% 3.9%` |
| `--popover` | `var(--white)` | `#FFFFFF` |
| `--popover-foreground` | `var(--gray-700)` | `#595959` |
| `--logo-primary` | `var(--gray-900)` | `#1E1D1B` |
| `--logo-secondary` | `var(--orange-300)` | `#FFBA50` |
| `--tag-inverted-background` | `var(--gray-900)` | `#1E1D1B` |
| `--tag-primary-background` | `var(--orange-50)` | `#FFF7E8` |
| `--tag-primary-border` | `var(--orange-100)` | `#FFDB9F` |
| `--tag-primary-foreground` | `var(--orange-700)` | `#8E3101` |
| `--tag-secondary-background` | `var(--bloom-50)` | `#FFEBF7` |
| `--tag-secondary-border` | `var(--bloom-100)` | `#FFC0E7` |
| `--tag-tertiary-background` | `var(--gray-50)` | `#FBFBFB` |
| `--tag-tertiary-border` | `var(--gray-500)` | `#B8B8B8` |
| `--tag-tertiary-foreground` | `var(--gray-750)` | `#414141` |
| `--tag-quaternary-background` | `var(--gray-50)` | `#FBFBFB` |
| `--tag-quaternary-border` | `var(--gray-500)` | `#B8B8B8` |

> 规律：所有语义 token 不存色值，只做 **指针**（`var(--gray-300)`、`var(--bloom-600)`），
> 所以换主题/换色板只需要替换底层 10 个家族，语义层不用动。**没有深色 token 层**——
> 深色是靠组件级 `dark:` 变体逐处覆盖（`.dark\:bg-*`），这也是它比 Supabase 那套简单的原因。

## 3. 排版

| 项 | 值 |
|---|---|
| UI 字体 | `var(--font-grotesk,Helvetica), Helvetica, Arial, sans-serif` |
| 等宽字体 | `var(--font-grotesk-mono,ui-monospace), ui-monospace, Menlo, Consolas, monospace` |
| 展示字体（大标题） | `var(--font-sharp-serif,Georgia), Georgia, serif` |
| 字重 | normal `400` · medium `500` |
| 字号阶梯 | `text-2xl` 1.75rem · `text-3xl` 2.25rem · `text-lg` 1.25rem · `text-md` 1.125rem · `text-sm` 1rem · `text-xl` 1.5rem · `text-xs` .875rem · `text-xxs` .75rem |

实测：登录页大标题 `Build. Tune. Scale` = **sharpSerifText 64px / 行高 1.1 / 字重 400 / #F9F7F5**（衬线、非加粗），
UI 正文 `monumentGrotesk 14px / 1.6`，卡片标题 `monumentGrotesk 24px / 1.4 / 500`。

## 4. 形状与层级

- **圆角**：`0`=0px · `2`=2px · `4`=4px · `6`=6px · `8`=8px · `10`=10px · `12`=12px · `16`=16px · `20`=20px · `24`=24px
- **阴影**（3 档）：
- `--shadow-4`: `0 8px 8px -4px #18181b05, 0 16px 32px -4px #18181b17`
- `--shadow-accent`: `0 2px 5px -1.5px #18181b03, 0 0 24px #18181b05, 0 7px 30px #18181b12`
- `--shadow-surface`: `0 0 32px #32343905`

## 5. 组件规范（从真实 DOM 计算样式提取）

| 组件 | 规格 |
|---|---|
| `button.secondary` | bg: `#FFFFFF` · fg: `#1E1D1B` · border: `1px #595959` · radius: `8px` · padding: `12px 20px` · font: `14px/1.4 monumentGrotesk` · height: `48px` · width: `384px (全宽)` |
| `button.primary` | bg: `#610A45 (bloom-700)` · fg: `#FFFFFF` · radius: `8px` · padding: `12px 20px` · font: `14px/1.4 monumentGrotesk` |
| `button.ghost` | bg: `transparent` · fg: `#1E1D1B` · radius: `8px` · padding: `12px 20px` |
| `input` | bg: `#FFFFFF` · fg: `#1E1D1B` · border: `1px #595959` · radius: `8px` · height: `48px` |
| `tag.primary` | bg: `orange-50 #FFF7E8` · border: `orange-100 #FFDB9F` · fg: `orange-700 #8E3101` · radius: `4px` |
| `tag.secondary` | bg: `bloom-50 #FFEBF7` · border: `bloom-100 #FFC0E7` · fg: `bloom-700 #610A45` · radius: `4px` |
| `tag.tertiary` | bg: `gray-50 #FBFBFB` · border: `gray-500 #B8B8B8` · fg: `gray-750 #414141` · radius: `4px` |
| `link` | color: `#610A45 (bloom-700)` · underline: `hover 下划线` |

补充实测细节：
- OAuth 按钮是 **描边型**（白底 + 1px `#595959` 描边 + 8px 圆角 + 48px 高 + 384px 全宽 + 14px 文字），不做阴影；
- 主行动按钮是 **bloom-700 实底白字**（第三方 cookie 弹窗里的 `Save my preferences` 就是这个）；
- 输入框与按钮同高 48px、同 8px 圆角、同 1px `#595959` 描边，聚焦态换成 `bloom-600`（`--input-active`）；
- 标签（tag）四套配色都用「50 底 + 100 描边 + 700 文字」的同族搭配，圆角 4px；
- 链接一律 bloom-700，hover 加下划线；
- 深色区域（登录页左栏）是 `#1B0A14 → #3A0A1F` 的梅紫渐变，文字用 `#F9F7F5`（neutral-50）。

## 6. 和 SwanLab/Supabase 体系的差异

| 维度 | Fireworks | Supabase / SwanLab |
|---|---|---|
| 颜色来源 | **固定 10 家族色板 + 语义指针** | OKLCH 参数派生（`--hue` 一改全变） |
| 深色模式 | 组件级 `dark:` 覆盖，无独立 token 层 | `[data-theme=dark]` 整层覆盖 |
| 主色 | bloom（梅紫 #A71E7E ~ #610A45） | 绿（hue 157.5） |
| 圆角 | 8px 为主（0–24 共 11 档） | `--radius-base` 派生 |
| 大标题 | 衬线 sharpSerifText | 无衬线 |

## 7. 落盘

- `tokens.json`：结构化数据（色板 / 语义 / 圆角 / 排版 / 阴影 / 组件）
- `index.html`：单文件预览（色板 + 语义映射 + 组件 demo）
