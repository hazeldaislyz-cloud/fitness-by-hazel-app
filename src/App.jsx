import { useEffect, useState } from "react";

const LOGO_B64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACgAKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDx2iiiuokKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnRxvK4SNGdj0VRk1Yt7QSL5szbIsE+hYDqfYe/4DJ4q490lpFsRNgIyIlypPu56ge3U+wqJT6IaRHHos5BM80FuByd75I+oGcfiRTTbaXED5uozSN6QW+R+bMBVOaeScje3yj7qgYVfoKjpKMnuwujSSHRnODe3iDtugX+hNPbSYHQvbX6uo7umB+JBOPxrKqW3Wd7mNbVZGnY4QRAlifQY5pOMlqpfkO67Ek9hcW4JZNygZLIcgD1PcfjVauxfwx4jstMa/vdOaGGMb2kDD5R6sqnK/wC8v4g1g3FtHLuY4ikGNzHAAz0344wezjg9wKinXjPZp+g3BozKKdJG8UjRyKVdTgg9qbXQQFFFFABRRRQAUUUUAFFFFABVi1gEh8x13ICFC5xvbsuew7k9h+FQKrO6qoyzHAHqa0CoJWBHwnMYf0UcyP8AjjH0GKiTtoNBLOFXziQ5J/dDHDEcb8f3R0Uf/XrPJLMWYksTkknJJp88vnSlwNq9EX+6o6Co6cY2BsKKKu6TpN7reoR2NjCZJn/JR3Zj2FOUlFXewJXGadpt3q19FZWUJlnkPCjoB3JPYD1rvL28sPhpbCw05Ib3xLKgM9xIuUtge2PX0X8T2Fb9zHp/wr8JmWEJPrV3+7iZxy7/AN7HZF649cdzXjrGe6uWkkaSe5ncszH5nkcn9STXmQm8dJv/AJdr/wAm/wCAbNey/wAX5Hs/wy17VPEllq0Os3TXaoygO6gYVlIK8ADHH615BZz8rBvAKkrC7dBz91vVT+nX1r1nTbc/D74Y315d4TULlTtTPPmuNqL+A5P0NeMou2NV64GKjAQhKrWlTXu3SXyWpVVtRinuackQnRY1Uq3KxBuqsOsR/wDZT+H0zq0Eb7RGpZsGQiKQ+jj7j/0P41BdAvtuMYMmRIPRx978+D+Jr0oOzszBlaiiitSQooooAKKKKACiiigCxa5QyTDrEhK/7x+Ufzz+FSyYiinx/CFt1/m38v1pLRcxKP79win6AE/1qOVs2kJPV3kc/oP6Gs3rIroV6K3NE8I6z4htJ7nTbZJY4WCNmQKScZwM10Gj/CnXLy5X+0Qljbg/MdwdyPYDj86yqYuhTvzzSt9/3DjTnLZHLaFoN/4h1FbOxi3N1eQ/djX1Y/06mveNA8PaX4L0SV9wAjjMt1dOPmYKMk/Qdh/+ur2j6LpnhrSzBaIkEEal5JXPXA5ZmP8AOs7xxeR/8K71i5hcNHLZkIw6EOQAf1r5zF46eMqKnHSDaXr6ndToqknJ7nmml6lD4++J8U+qQh7F0kS3tpOixqpKg+55Y+/0r1CLQPC/haGTUvsdnYxxjLXEn8P0J5/AV87QTzWs8c9vK8U0Z3JIjYZT6g10OmPP4inmfWbm4v2j2lDcSs23r0HQV6uIy2dSUYwnywStY5PrMaUHKSux/jnxi/i7VE8hXi0u1JFtG3BcnrIw9T2HYfjXL1o67bQ2eqmCBAkflK2B6nNZ1elRowowVOC0Rj7T2nv9yxa/OZYP+eqED/eHzD+WPxqaQ+dHMf8AnpGtwP8AeHDfzb8qm8P6Jqmv6xFZaRbma6+/6KgH8TE8AV2eq/B/xRpOni4S4sbtkQgwQOd+DnIG4AN1NZ1a1OnL35JFxTex5xRSkFSQQQQcEHqKSukgKKKKACiiigAooooAu2f3IP8Ar5A/NagkH+h2v0cfr/8AXp9u+23lI6xuko/A4P8AMU64TbBIg/5ZTn/vlhx/6D+tZ/a/r+upXQ674a+LYfD2py2d/II7C7wTI3SKQdCfYjg/hXo+qfEvwrpsbFdSW9lHSKzUyE/jwo/E18/12vgfwFN4kcXl4Wh01D1HDTEdQD2Hqfy9R5ePwOGcniKraXXzN6VaaXJEk1fxD4m+JFw2n6fZvDpwPNvE3B9DK/AP06exr1bX9CTV/CD6RLdiziaOJXmOPlCkHuQO1crN490bRr+08PeFrGK5YzJC0y/LChLAHGOXPv09zTvjNOF8L2FqefPvQSPUKjH+orzZqdSrSpwhyK+nf1ZvGyjKTd31MeP4eeE55fs8PjCF7g8BFlhJz9M1HL4Mm8I3RV7tLmK4GUYIVYbeuR+NeZbExjYuPpXbeHtXvb/TlsrqZporM4hLnLKrfw59BjivdpUMRTqJupzR6ppHm4ucHRl7tn/wTC8T/wDIc/7YJ/M1kVseKB/xOx7wJ/M1j12kUP4cT3X4GJa2vhnVr/Cm6e6ETeoVUBUfTLMa6jxNqy2OkT3tzMRjAUDqzHooFeC+EvF114WuZwimW0uQBNEDg5HRh7jJ+oq14g8WDV51kD3Lxxr+7jfgLnv7V87jcDXq4m+8WelQqU4xu9zG8RTR3Ou3VxEu1ZSHI9yOay6dJI0sjOxyzHJpte9ShyQUeyOSTvJsKKKK0JCiiigAooooAmtXVZwJDiNwUc+gPGfw6/hVoRsxEb8NIpt3z2kX7v54A/Os+r6Os8JZ2wCAkx/ukfck/of/AK9ZzXUpEWm2TajqtpYglTcTLFnuMnBr1P4oaq2gaDp3hvTM28V1G3mlOD5KYGwfUnn2HvXm0VxLYapbaoE/e286PMg7ODn8mAyPfNev+MvDsXjzw/Y6npMyNcRqXgLHCyI2MoT2OR+BBFeVjpxWIpSq/Br95vSi3CSjueafDrTG1DxpYBU/d2xM78cAKOP1Iro/jNqCS6tpWmo2Wt4XnkHoXIC/opP410+mWGlfDDwtLf6hIJLqQfOV4aZ8cRoPT+XJNeL6nqV1rWq3Wp3rA3Fy+9sdFHQKPYDA/Cii/reM9vH4Iqy82Ev3dPke7KtdN4T+7dfVa5mun8J42XXPOV4/CvZR5+J/hMo+KR/xOk/691/9CasatrxV/wAhiL/r3H/oTVjxxvNIsaDLMcD/AD6UiqH8NFi1jJikbODJ+5U+meWP4L/Olnk/cMw489sgeka8L+v/AKDUxVCBGrlYgn38fdjz8z/Vj0HpiqU8vnSl9u1eAq/3VHAFQtXc32I6KKK0JCiiigAooooAKKKKACnwytDIHTGehBGQwPUH2NMopNXA1I2jePehBQLs/eHhV/55yH+7/dft3x209I8T654TSZdMnBtXb5oLmPeI3PqOx9xw1c3HK8MgeNirDuP5e4q/BfRHaHHlEDaMDK49B1IHsQy+wrnqUVJWkro0jJrVaEWr6xqWvX32zVbt7mYDC54VB6Ko4AqlWw2lxXQ32zqp9F+ZT+Wcfr9BVZ9E1Jfu2cso9Yl3/wAuaunKnFcsdPIlpvVlCnRySQyCSJ2R16MpwRU66fevII1srkuf4fJbP8qujw/dxDdelLRe4kYb/wAs8fiRVupFbsXK2Urm5udTuYmlAkmCeWNi4Lck/wBatRW4gjKDa7suZGJwu33PZPU/xdBx1e09jZo0cBLk8MV5LfVjxj2AI9qz57qSf5ThUzu2DOM+pJ5J9zU6y9AUVFWQ65uA+Y42JQtuZyMGRvUjsPQdqr0UVolYAooopiCiiigArs/DHgzTNW8K3viHWNdfTLO2uVtvktTMSSAcnBz/ABAdK4yvVPCWo2+lfBbWbq50y11KJdVjBt7rOxsiMZ49OtTLYZy8vh/ws+t21nYeKLi5tJIZXlnGmvujZRlVC9TnnntiqbeFZ18Bw+KPNYpJeNbGARH5VC58zd6ZGPT3rsPhzqltq/xQhubXSLPS4xp86+RabthIX73PfnH4Ux9S1d/gBDHb3V2w/tKS1dY8n9x5bfIcfwe1K7A86Fhet5mLO5PlqHfELfIpGQTxwCOcmmW1rcXkvlWtvNPJjOyGMuceuAK97ufEWp23xd8M6NBdGPTprKLz4FA2zFo3yW45I2rj0xWLprWWjfD7Wrm1vdR02Q6/NDc3GlQLJMiKx8tDkjanTn396OYLHjogmafyFhkM27b5YQ7s+mOufaluLa4tJjDcwSwSjqksZRvyIzXtB1hx42h1iLw/q0xPh4m7uTHHBdsm7b9pRAxw3bHXHTgVWuxe3Vx4L1nTr2fxJZLfyR2sGoxCK7LAFirSNwwAUkE9CB1o5gseRXFld2Wxrm1uLfeMoZYmTcPbIGa6jwL4efxTe6gk+tXOnW1hZtdSSxhpDtB7DI7ZNdd4pmfxB4I1+90/WtUltbS7jkvNO1qDMts5bAEUnYZONvPA7Z5zvg23l3nid/s63O3R5D5DAkS8/dIHJz0/Ghu6Aoan4Q0+78MX+u+H/Fsurpp203UM8DxOit0I3Hnv+Rrh2tpxOsLQSiZsbYyh3NnpgdTnPHrXr1oZNf8Ahv4otZ/DS+F7aCBbrzbaNokuWUEiNw4yw4HQ9x+NzS1t9Yi8P/ES6CNHpGmTLfg8ZuIBiP8AE7s/gKSdgPHtJ05tT12y0xnMLXNyluWK8puYKTj29K1b7wsLT4hN4WW7LL9uS0FwU5wxX5seuGqPwxcS3fj/AEi6nO6abVIpZD6s0oJ/U16hqXjC0h+Lx0o+FNFkl/tOKH7c8Z87JK/Pn+8M8fSqbdwPKvEHh+XR/Fl/oVsZbx7aYxoUjJZxgHO0Z9azHsruK5+zSWtwlx/zyaJg/wD3zjNex3K3tr4o+ImqxakdMsoZ4Y7i6trYzXYyAQsXI2g9yfb0zS+KodZ1G08Az+H5dVGr3CXEUd3eYS58s7TukI4A25P09TSUgPG5bO7t03z2txEhON0kTKM/UihrK7W1W6a1nW2Y4WYxMEP0bGK9Y8Za1dSXGkeEbma/vNItryH+1NTuo2xcybxuAYjAQZP1/DJ6TU9XSHx1q+kTHxBqED2rQ/2KllGLRYtgwysXAAGPvYHpRzAeO6t4ZXTPB/h/XRdGRtWMwaEpgR7GwMHvmuer0DxV/wAkh8BfW7/9Drz+qQgq2mp30ely6Yl1KtjLKJpLcH5GcdGI9f8AAVUopgWtO1K90m7F3p91JbXAVkEkZwcMMEfiKt6d4m1vSNPuLDTtUuba0uM+bDG+FbIwfpkccVlUUrAaR1/V21W31RtQnN9bKqQzlvmQKMKB9AT+dO0vxLrei3c11puqXVrNOSZmjf8A1hznLA8E5J/OsuiiwGoPEmtjWv7ZGrXn9pdPtXmnfjpjPp7dKdqfifXdYvILvUNWu7i4tzmF2kwYj6rjGDwORWTRRZAbWreLvEOu2iWuqaxd3dupDCKR/lyOhIAGT9ap6VrOp6Hctc6Vfz2czpsZ4X2krnOD7ZAqjRRYDY1PxZ4h1m1+zalrV9dQZBMUspKkjpkdD+NdDqfiTQ9P8BSeGfDkuozfbbpbi8mvEWPAAGEUA+qjn271w1FFkBJBPLa3EVxBI0c0Th43U4KsDkEfjU8uqX0+qnVJbuVr8yiY3BPz7wchs+vAqpRTA2bPxb4g0/U7rUbTV7qG8uzm4lVhmU/7Qxg/lxTk8YeJElilXXb/AMyJ3kRzMSys/wB45Pr+VYlFKyA3NQ8ZeJdVsZLLUNcvrm1lxvhkkyrYORkfUCiTxn4lm0n+y5NdvmsdmwwmXgr/AHSepHtmsOiiyAtT6nfXOn2lhPdSyWlpu+zwsfli3HLY+pqrRRTA/9k=";

const B = {
  primary:"#00A6A6", light:"#E9FBFB", glow:"#00A6A61F",
  navy:"#15172B", gold:"#D6A84F",
  bg:"#F7F8FA", card:"#FFFFFF", surface:"#F1F5F7", border:"#E2E8F0",
  text:"#1F2933", muted:"#667085", dim:"#98A2B3",
  green:"#16A34A", blue:"#2563EB", purple:"#7C3AED", yellow:"#D6A84F",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#E9EDF2;}
  .fbh{font-family:'Inter',sans-serif;background:#F7F8FA;color:#1F2933;min-height:100vh;max-width:430px;margin:0 auto;box-shadow:0 0 0 1px #E2E8F0;}
  .brand{font-family:'Inter',sans-serif;letter-spacing:-0.01em;}
  .btn-p{background:linear-gradient(135deg,#D6A84F,#00A6A6);color:#fff;border:none;border-radius:18px;font-family:'Inter',sans-serif;font-weight:800;cursor:pointer;transition:all 0.2s;box-shadow:0 12px 28px #00A6A62B;}
  .btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 30px #00A6A638;}
  .tab-btn{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 0;flex:1;transition:all 0.2s;}
  .wpill{border:1px solid #E2E8F0;border-radius:999px;padding:7px 13px;background:#fff;cursor:pointer;font-family:'Inter',sans-serif;font-weight:800;color:#667085;font-size:12px;transition:all 0.18s;white-space:nowrap;box-shadow:0 4px 12px #15172B0A;}
  .wpill.on{background:#15172B;border-color:#15172B;color:#fff;}
  .dchip{border-radius:16px;border:1px solid #E2E8F0;cursor:pointer;padding:9px 11px;text-align:center;min-width:54px;flex-shrink:0;background:#FFFFFF;transition:all 0.18s;box-shadow:0 6px 18px #15172B0A;}
  .dchip.on{background:#00A6A6;border-color:#00A6A6;color:#fff;}
  .echip{border-radius:999px;border:1px solid #E2E8F0;cursor:pointer;padding:6px 12px;font-size:12px;font-weight:700;white-space:nowrap;background:#FFFFFF;color:#667085;transition:all 0.18s;}
  .echip.on{background:#E9FBFB;border-color:#00A6A6;color:#00A6A6;}
  .dlvl{border-radius:999px;border:1px solid #E2E8F0;cursor:pointer;padding:6px 13px;font-size:12px;font-weight:700;white-space:nowrap;transition:all 0.18s;background:#fff;color:#667085;}
  .dlvl.on{border-color:#D6A84F;background:#FFF7E5;color:#15172B;}
  .exitem{border-radius:16px;padding:13px 14px;margin-bottom:10px;border:1px solid #E2E8F0;background:#FFFFFF;transition:all 0.18s;cursor:pointer;box-shadow:0 8px 22px #15172B08;}
  .exitem.done{background:#ECFDF3;border-color:#16A34A33;}
  .demo-img{width:100%;aspect-ratio:16/9;border-radius:14px;object-fit:cover;border:1px solid #E2E8F0;background:#E9FBFB;display:block;}
  .demo-media{position:relative;}
  .demo-loading{position:absolute;inset:0;border-radius:14px;background:linear-gradient(110deg,#E9FBFB 8%,#F7F8FA 18%,#E9FBFB 33%);background-size:200% 100%;animation:demoShimmer 1.2s linear infinite;display:flex;align-items:center;justify-content:center;color:#00A6A6;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;}
  @keyframes demoShimmer{to{background-position-x:-200%;}}
  .demo-btn{border:1px solid #00A6A633;background:#E9FBFB;color:#00A6A6;border-radius:999px;padding:8px 12px;font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap;transition:all 0.18s;}
  .demo-btn:hover{background:#00A6A6;color:#FFFFFF;}
  .metric-pill{background:#F7F8FA;border:1px solid #E2E8F0;border-radius:999px;padding:6px 9px;font-size:11px;font-weight:800;color:#15172B;}
  .mitem{background:#FFFFFF;border-radius:16px;padding:14px 15px;margin-bottom:12px;border:1px solid #E2E8F0;border-left:4px solid transparent;transition:border-color 0.2s;box-shadow:0 8px 22px #15172B08;}
  .mitem:hover{border-left-color:#00A6A6;}
  .pbar{background:#E8EEF3;border-radius:999px;height:7px;overflow:hidden;}
  .wc{background:#FFFFFF;border-radius:16px;border:1px solid #E2E8F0;}
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;}
  .bcard{background:#FFFFFF;border:1px solid #E2E8F0;border-radius:20px;padding:18px;margin-bottom:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 10px 26px #15172B0A;}
  .bcard:hover{border-color:#00A6A6;transform:translateY(-2px);}
  .wt-input{background:#FFFFFF;border:1px solid #D5DEE8;border-radius:16px;color:#1F2933;font-family:'Inter',sans-serif;font-weight:800;font-size:24px;text-align:center;width:100%;padding:14px 8px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
  .wt-input:focus{border-color:#00A6A6;box-shadow:0 0 0 4px #00A6A61A;}
  .check{width:22px;height:22px;border-radius:50%;border:2px solid #CBD5E1;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;}
  .check.done{background:#00A6A6;border-color:#00A6A6;}
  ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}
  input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
`;

const TYPE={
  strength:{c:B.blue,l:"Strength",bg:"#EFF6FF"},
  hiit:{c:B.primary,l:"HIIT",bg:"#E9FBFB"},
  cardio:{c:B.green,l:"Cardio",bg:"#ECFDF3"},
  recovery:{c:B.purple,l:"Recovery",bg:"#F5F3FF"},
  rest:{c:B.muted,l:"Rest",bg:"#F1F5F7"},
};

const EQUIP=[
  {id:"full",label:"🏋️ Full Setup"},
  {id:"dbs",label:"🔵 DBs + Bands"},
  {id:"bands",label:"🟡 Bands Only"},
  {id:"bw",label:"💪 Bodyweight"},
];

const DIFF=[
  {id:"beginner",label:"🌱 Beginner",sets:-1,restMod:"+30s",note:"Focus on form"},
  {id:"intermediate",label:"🔥 Intermediate",sets:0,restMod:"",note:""},
  {id:"advanced",label:"⚡ Advanced",sets:1,restMod:"-15s",note:"Push heavier"},
];

const SWAP={
  "Barbell Bench Press":{full:"Barbell Bench Press",dbs:"DB Bench Press",bands:"Band Chest Press",bw:"Wide Push-ups"},
  "Barbell Bent-over Row":{full:"Barbell Bent-over Row",dbs:"DB Bent-over Row",bands:"Band Row",bw:"Superman Hold ×15"},
  "Barbell Back Squat":{full:"Barbell Back Squat",dbs:"DB Goblet Squat",bands:"Banded Squat",bw:"Bodyweight Squat ×25"},
  "Romanian Deadlift (Barbell)":{full:"Romanian Deadlift (Barbell)",dbs:"DB Romanian Deadlift",bands:"Band RDL",bw:"Single-leg BW RDL"},
  "Romanian Deadlift":{full:"Romanian Deadlift",dbs:"DB Romanian Deadlift",bands:"Band RDL",bw:"Single-leg BW RDL"},
  "Conventional Deadlift":{full:"Conventional Deadlift",dbs:"DB Sumo Deadlift",bands:"Band Deadlift",bw:"Good Mornings BW"},
  "Barbell Hip Thrust":{full:"Barbell Hip Thrust",dbs:"DB Hip Thrust",bands:"Banded Hip Thrust",bw:"Glute Bridge ×25"},
  "Barbell Row":{full:"Barbell Row",dbs:"Dumbbell Row",bands:"Band Row",bw:"Superman Row"},
  "Barbell Overhead Press":{full:"Barbell Overhead Press",dbs:"DB Overhead Press",bands:"Band Overhead Press",bw:"Pike Push-ups"},
  "Dumbbell Overhead Press":{full:"Dumbbell Overhead Press",dbs:"Dumbbell Overhead Press",bands:"Band Overhead Press",bw:"Pike Push-ups"},
  "Close-grip Barbell Press":{full:"Close-grip Barbell Press",dbs:"DB Close-grip Press",bands:"Band Tricep Pushdown",bw:"Diamond Push-ups"},
  "Tricep Skull Crushers (DB)":{full:"Tricep Skull Crushers (DB)",dbs:"Tricep Skull Crushers (DB)",bands:"Band Tricep Pushdown",bw:"Diamond Push-ups"},
  "SS1: DB Deadlift + Burpee":{full:"SS1: Barbell Deadlift + Burpee",dbs:"SS1: DB Deadlift + Burpee",bands:"SS1: Band Pull-through + Burpee",bw:"SS1: Good Morning + Burpee"},
  "SS1: Barbell Deadlift + Burpee":{full:"SS1: Barbell Deadlift + Burpee",dbs:"SS1: DB Deadlift + Burpee",bands:"SS1: Band Pull-through + Burpee",bw:"SS1: Good Morning + Burpee"},
};
const sw=(n,e)=>SWAP[n]?SWAP[n][e]||n:n;
const fallbackDemo=(name)=>`https://placehold.co/480x270/E9FBFB/15172B.webp?text=${encodeURIComponent(name)}`;
const cueFor=(ex)=>ex.note||"Move with control and keep steady breathing.";

const WEEKS=[
  {label:"W1",theme:"Foundation",sub:"Establish baseline · 3 sets · perfect form",intensity:55,days:[
    {day:"MON",label:"Upper Body Strength",type:"strength",emoji:"💪",
      warmup:["Arm circles 30s","Band pull-aparts ×15","Shoulder rolls ×10","Push-up hold 30s"],
      ex:[{n:"Barbell Bench Press",s:3,r:"10",t:"60s",note:"3-count descent"},{n:"Barbell Bent-over Row",s:3,r:"10",t:"60s",note:"Neutral spine"},{n:"Dumbbell Overhead Press",s:3,r:"10",t:"60s",note:"Engage core"},{n:"Band Lateral Raises",s:3,r:"15",t:"45s",note:"Slow & controlled"},{n:"Tricep Skull Crushers (DB)",s:3,r:"12",t:"45s",note:"Elbows fixed"},{n:"Dumbbell Bicep Curls",s:3,r:"12",t:"45s",note:"Supinate at top"}],
      cd:["Chest doorway stretch 30s","Cross-body shoulder 30s","Child's pose 1 min"]},
    {day:"TUE",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga / Stretch Flow",s:1,r:"20–25 min",t:"—",note:"This still counts as a session ✓"},{n:"Foam Rolling",s:1,r:"10 min",t:"—",note:"Focus on whatever was sore"},{n:"Light Walk (optional)",s:1,r:"15 min",t:"—",note:""}],cd:[]},
    {day:"WED",label:"Lower Body Strength",type:"strength",emoji:"🦵",
      warmup:["Glute bridges ×15","Hip circles 30s","BW squats ×10","Leg swings ×10"],
      ex:[{n:"Barbell Back Squat",s:3,r:"10",t:"60s",note:"Break parallel, chest up"},{n:"Romanian Deadlift (Barbell)",s:3,r:"12",t:"60s",note:"Push hips back"},{n:"Dumbbell Walking Lunges",s:3,r:"12 each",t:"60s",note:"Long stride"},{n:"Band Glute Kickbacks",s:3,r:"15 each",t:"45s",note:"Squeeze at top"},{n:"Sumo Squat (DB)",s:3,r:"15",t:"45s",note:"Toes out 45°"},{n:"Standing Calf Raises",s:3,r:"20",t:"30s",note:"Pause at top"}],
      cd:["Pigeon pose 1 min each","Hip flexor 45s each","Hamstring stretch 1 min"]},
    {day:"THU",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga / Mobility Flow",s:1,r:"20–25 min",t:"—",note:"Focus on hips & legs"},{n:"Foam Rolling — lower body",s:1,r:"10 min",t:"—",note:""}],cd:[]},
    {day:"FRI",label:"Full Body HIIT ⚡",type:"hiit",emoji:"⚡",
      warmup:["Jumping jacks 1 min","Hip openers 30s","Arm swings 30s","Inchworm ×5"],
      ex:[{n:"SS1: DB Deadlift + Burpee",s:3,r:"10 + 10",t:"60s",note:"No rest within SS"},{n:"SS2: Push-up + Jump Squat",s:3,r:"12 + 15",t:"60s",note:"Explosive squats"},{n:"SS3: DB Row + Mountain Climbers",s:3,r:"12 + 30s",t:"60s",note:""},{n:"SS4: Overhead Press + High Knees",s:3,r:"10 + 30s",t:"60s",note:""},{n:"AMRAP Finisher — 5 min",s:1,r:"Max rounds",t:"—",note:"5 burpees · 10 squats · 15 high knees"}],
      cd:["Cat-cow 1 min","Child's pose 1 min","Spinal twist 1 min each"]},
    {day:"SAT",label:"Cardio + Core",type:"cardio",emoji:"🏃",
      warmup:["5 min slow walk","Dynamic leg swings"],
      ex:[{n:"Brisk Walk / Light Jog",s:1,r:"30 min",t:"—",note:"60–70% max HR"},{n:"Core Circuit",s:2,r:"10 each",t:"30s",note:"Plank · bicycle · leg raises · Russian twists"}],
      cd:["Full body stretch 10 min","Breathing 3 min"]},
    {day:"SUN",label:"Rest Day",type:"rest",emoji:"😴",warmup:[],
      ex:[{n:"Complete Rest",s:1,r:"—",t:"—",note:"Sleep · hydrate · meal prep 🌙"}],cd:[]},
  ]},
  {label:"W2",theme:"Volume Surge",sub:"Add 1 set · slight weight increase · 5 HIIT rounds",intensity:65,days:[
    {day:"MON",label:"Upper Body Strength",type:"strength",emoji:"💪",
      warmup:["Band pull-aparts ×20","Arm circles","Push-up hold 45s"],
      ex:[{n:"Barbell Bench Press",s:4,r:"10",t:"60s",note:"↑ Weight 2.5kg"},{n:"Barbell Bent-over Row",s:4,r:"10",t:"60s",note:"Squeeze shoulder blades"},{n:"Dumbbell Overhead Press",s:4,r:"10",t:"60s",note:"Add 1–2kg"},{n:"Band Lateral Raises",s:4,r:"15",t:"45s",note:"Heavier band or 3s slow"},{n:"Tricep Skull Crushers (DB)",s:4,r:"12",t:"45s",note:""},{n:"Hammer Curls (DB)",s:4,r:"12",t:"45s",note:"Neutral grip"}],
      cd:["Shoulder/chest stretch 10 min"]},
    {day:"TUE",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga Flow",s:1,r:"25 min",t:"—",note:""},{n:"Foam Rolling",s:1,r:"15 min",t:"—",note:""}],cd:[]},
    {day:"WED",label:"Lower Body Strength",type:"strength",emoji:"🦵",
      warmup:["Glute bridges ×20","Banded clamshells ×15","BW squats ×15"],
      ex:[{n:"Barbell Back Squat",s:4,r:"10",t:"60s",note:"↑ 2.5–5kg"},{n:"Romanian Deadlift",s:4,r:"12",t:"60s",note:""},{n:"Dumbbell Walking Lunges",s:4,r:"12 each",t:"60s",note:"Heavier DBs"},{n:"Single-leg RDL (DB)",s:3,r:"10 each",t:"45s",note:"NEW — balance + glutes"},{n:"Band Glute Kickbacks",s:4,r:"15 each",t:"45s",note:""},{n:"Weighted Calf Raises",s:4,r:"20",t:"30s",note:"Hold DBs"}],
      cd:["Pigeon · figure-4 · hamstring 12 min"]},
    {day:"THU",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga / Mobility",s:1,r:"25 min",t:"—",note:""},{n:"Foam Roll + Stretch",s:1,r:"15 min",t:"—",note:""}],cd:[]},
    {day:"FRI",label:"Full Body HIIT ⚡",type:"hiit",emoji:"⚡",
      warmup:["Full dynamic warmup 7 min"],
      ex:[{n:"SS1: Barbell Deadlift + Burpee",s:4,r:"8 + 10",t:"60s",note:"Barbell replaces DB"},{n:"SS2: Decline Push-up + Jump Squat",s:4,r:"15 + 15",t:"60s",note:""},{n:"SS3: DB Row + Mountain Climbers",s:4,r:"10 + 40s",t:"60s",note:""},{n:"SS4: Arnold Press + High Knees",s:4,r:"10 + 40s",t:"60s",note:"NEW press variation"},{n:"AMRAP Finisher — 6 min",s:1,r:"Max rounds",t:"—",note:"5 burpees · 10 squats · 15 high knees"}],
      cd:["Full body cool-down 10 min"]},
    {day:"SAT",label:"Cardio + Core",type:"cardio",emoji:"🏃",
      warmup:["5 min slow warm-up"],
      ex:[{n:"Brisk Walk / Light Jog",s:1,r:"40 min",t:"—",note:"↑ 10 min"},{n:"Core Circuit",s:3,r:"12 each",t:"30s",note:"Plank · bicycle · leg raises · Russian twists"}],
      cd:["Static stretch + breathing 10 min"]},
    {day:"SUN",label:"Rest Day",type:"rest",emoji:"😴",warmup:[],
      ex:[{n:"Complete Rest",s:1,r:"—",t:"—",note:"Sleep & nutrition prep 🌙"}],cd:[]},
  ]},
  {label:"W3",theme:"Intensity Peak",sub:"↑ Load 5–10% · Rest ↓ 45s · Tabata HIIT",intensity:80,days:[
    {day:"MON",label:"Upper Body — Heavy",type:"strength",emoji:"💪",
      warmup:["Thoracic rotations","Band warm-up","Push-up activation"],
      ex:[{n:"Barbell Bench Press",s:4,r:"8",t:"45s",note:"↑ Weight ↓ Reps = more intensity"},{n:"Barbell Row",s:4,r:"8",t:"45s",note:""},{n:"Barbell Overhead Press",s:4,r:"8",t:"45s",note:"Push heavier"},{n:"Band Face Pulls",s:4,r:"20",t:"30s",note:"NEW — rear delt"},{n:"Close-grip Barbell Press",s:4,r:"10",t:"45s",note:"NEW compound tricep"},{n:"Barbell Curl",s:4,r:"10",t:"45s",note:"3-count negative"}],
      cd:["Shoulder + chest mobility 10 min"]},
    {day:"TUE",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga Flow",s:1,r:"30 min",t:"—",note:"Go deeper"},{n:"Foam Rolling",s:1,r:"15 min",t:"—",note:"IT band, quads, lats"}],cd:[]},
    {day:"WED",label:"Lower Body — Power",type:"strength",emoji:"🦵",
      warmup:["Banded: 3×15 glute bridges · clamshells · monster walks"],
      ex:[{n:"Barbell Back Squat",s:4,r:"8",t:"45s",note:"Heavy"},{n:"Conventional Deadlift",s:4,r:"8",t:"60s",note:"NEW full deadlift"},{n:"Barbell Hip Thrust",s:4,r:"12",t:"45s",note:"NEW — mat under shoulders"},{n:"Bulgarian Split Squat (DB)",s:3,r:"10 each",t:"45s",note:"NEW — most demanding"},{n:"Banded Standing Abduction",s:3,r:"20 each",t:"30s",note:""},{n:"Explosive Jump Squats (BW)",s:3,r:"15",t:"30s",note:"Finisher"}],
      cd:["Hip flexor · hamstring · glute 12 min"]},
    {day:"THU",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga + Mobility",s:1,r:"30 min",t:"—",note:""},{n:"Foam Rolling",s:1,r:"15 min",t:"—",note:""}],cd:[]},
    {day:"FRI",label:"Tabata HIIT ⚡",type:"hiit",emoji:"⚡",
      warmup:["8 min full dynamic warm-up"],
      ex:[{n:"TABATA: 20s on / 10s off × 8 rounds per block",s:8,r:"20s / 10s",t:"1.5 min between",note:"4 min per block"},{n:"Block 1 — Burpees",s:8,r:"20s / 10s",t:"",note:""},{n:"Block 2 — Jump Squats",s:8,r:"20s / 10s",t:"",note:""},{n:"Block 3 — Mountain Climbers",s:8,r:"20s / 10s",t:"",note:""},{n:"Block 4 — High Knees",s:8,r:"20s / 10s",t:"—",note:"Max effort every interval"}],
      cd:["Full body stretch 12 min"]},
    {day:"SAT",label:"Cardio + Core",type:"cardio",emoji:"🏃",
      warmup:["5 min slow walk"],
      ex:[{n:"Jog / Power Walk Intervals",s:1,r:"40 min",t:"—",note:"3 min jog + 2 min walk"},{n:"Core Superset",s:4,r:"15 each",t:"20s",note:"Plank · bicycle · leg raise · Russian twist"}],
      cd:["Static stretch + breathing 12 min"]},
    {day:"SUN",label:"Rest Day",type:"rest",emoji:"😴",warmup:[],
      ex:[{n:"Complete Rest",s:1,r:"—",t:"—",note:"Ice sore areas. Meal prep. 🌙"}],cd:[]},
  ]},
  {label:"W4",theme:"Peak & Consolidate",sub:"5 sets · max load · push every session",intensity:95,days:[
    {day:"MON",label:"Upper Body — Max Effort",type:"strength",emoji:"💪",
      warmup:["Full shoulder mobility + band warm-up"],
      ex:[{n:"Barbell Bench Press",s:5,r:"8–10",t:"45s",note:"Peak weight of 4-week cycle"},{n:"Barbell Row",s:5,r:"8–10",t:"45s",note:"Go heavy"},{n:"Barbell Overhead Press",s:5,r:"8",t:"45s",note:""},{n:"Band Superset: Face Pulls + Lateral Raises",s:4,r:"20 + 15",t:"30s",note:"No rest between"},{n:"Giant Set: Skull Crushers + Curls + Hammer Curls",s:4,r:"12 each",t:"60s",note:"No rest between moves"}],
      cd:["Upper body stretch 10 min"]},
    {day:"TUE",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga + Deep Mobility",s:1,r:"35 min",t:"—",note:"Hold each pose longer"},{n:"Box breathing",s:1,r:"10 min",t:"—",note:"Inhale 4 · hold 4 · exhale 4 · hold 4"}],cd:[]},
    {day:"WED",label:"Lower Body — Peak Load",type:"strength",emoji:"🦵",
      warmup:["Full glute + hip activation 10 min"],
      ex:[{n:"Barbell Back Squat",s:5,r:"8",t:"60s",note:"Heaviest squat of 4 weeks"},{n:"Conventional Deadlift",s:5,r:"6–8",t:"60s",note:"Peak load — brace hard"},{n:"Barbell Hip Thrust",s:4,r:"12",t:"45s",note:""},{n:"Bulgarian Split Squat (DB)",s:4,r:"12 each",t:"45s",note:"↑ Weight vs W3"},{n:"Plyometric Lunges",s:3,r:"20 (10 each)",t:"30s",note:"Explosive finisher"},{n:"Single-leg Calf Raise (weighted)",s:3,r:"15 each",t:"30s",note:""}],
      cd:["Deep lower body stretch 15 min"]},
    {day:"THU",label:"Active Recovery",type:"recovery",emoji:"🧘",warmup:[],
      ex:[{n:"Yoga + Mobility",s:1,r:"35 min",t:"—",note:""},{n:"Foam Rolling — full body",s:1,r:"15 min",t:"—",note:""}],cd:[]},
    {day:"FRI",label:"Peak HIIT Circuit ⚡",type:"hiit",emoji:"⚡",
      warmup:["10 min full warm-up"],
      ex:[{n:"CIRCUIT: 6 rounds · 45s on / 15s off",s:6,r:"45s / 15s",t:"90s between",note:"Hardest HIIT of 4 weeks"},{n:"Burpees",s:6,r:"45s",t:"",note:""},{n:"Jump Squats",s:6,r:"45s",t:"",note:""},{n:"Mountain Climbers",s:6,r:"45s",t:"",note:""},{n:"High Knees",s:6,r:"45s",t:"",note:""},{n:"Plank to Push-up",s:6,r:"45s",t:"",note:""},{n:"Jump Lunges",s:6,r:"45s",t:"",note:""}],
      cd:["15 min full body cool-down 🎉"]},
    {day:"SAT",label:"Active Cardio + Reflect",type:"cardio",emoji:"🏃",
      warmup:["5 min easy walk"],
      ex:[{n:"Long Walk or Jog",s:1,r:"45–50 min",t:"—",note:"Reflect on your 4 weeks 💭"},{n:"Core Work",s:3,r:"Max reps",t:"30s",note:"Plank · hollow hold · dead bug"}],
      cd:["20 min deep static stretch 🌸"]},
    {day:"SUN",label:"Rest + Reassess",type:"rest",emoji:"😴",warmup:[],
      ex:[{n:"Rest + Reassess",s:1,r:"—",t:"—",note:"Weigh in · measure · celebrate · plan next cycle 📏"}],cd:[]},
  ]},
];

const MEALS=[
  {day:"MON",label:"Training",type:"train",kcal:1700,p:96,c:178,f:50,items:[
    {t:"6:30 AM",l:"Pre-Workout ⚡",kcal:110,p:1,c:28,f:0,foods:["1 banana","Black coffee or unsweetened tea"],note:"Light fuel — never train empty"},
    {t:"9:30 AM",l:"Post-Workout Breakfast 🍳",kcal:480,p:28,c:32,f:24,foods:["3 boiled/scrambled eggs","2 slices wholemeal toast","½ avocado","Tomato & onion salsa"],note:"Protein within 45 min of finishing"},
    {t:"12:30 PM",l:"Lunch 🍛",kcal:490,p:40,c:42,f:10,foods:["Grilled chicken breast ~150g","½ cup brown rice","Sukuma wiki in 1 tsp coconut oil","Tomato & cucumber side"],note:""},
    {t:"3:30 PM",l:"Snack 🥜",kcal:200,p:7,c:18,f:12,foods:["Handful groundnuts ~25g","1 orange or 2 passion fruits"],note:""},
    {t:"7:00 PM",l:"Dinner 🍲",kcal:420,p:20,c:58,f:4,foods:["Dengu stew — 1 cup","1 medium sweet potato","Steamed spinach or cabbage"],note:"Plant protein + complex carbs overnight"},
  ]},
  {day:"TUE",label:"Rest",type:"rest",kcal:1390,p:73,c:134,f:46,items:[
    {t:"7:30 AM",l:"Breakfast 🌿",kcal:370,p:12,c:50,f:12,foods:["Oats with 1 tbsp peanut butter","½ banana","Black coffee or herbal tea"],note:"Rest days need less"},
    {t:"11:00 AM",l:"Snack 🍊",kcal:130,p:3,c:18,f:5,foods:["1 orange or 2 passion fruits","10g groundnuts"],note:""},
    {t:"1:00 PM",l:"Lunch 🥗",kcal:380,p:18,c:28,f:18,foods:["Large salad + 2 boiled eggs","Lemon + olive oil dressing","1 slice wholemeal bread"],note:"Lower-carb day"},
    {t:"4:00 PM",l:"Snack 🥛",kcal:130,p:8,c:14,f:2,foods:["1 cup plain low-fat yoghurt"],note:""},
    {t:"7:00 PM",l:"Dinner 🍲",kcal:380,p:32,c:24,f:9,foods:["Chicken vegetable soup","1 slice wholemeal bread"],note:"Light nourishing dinner"},
  ]},
  {day:"WED",label:"Training",type:"train",kcal:1660,p:111,c:166,f:43,items:[
    {t:"6:30 AM",l:"Pre-Workout ⚡",kcal:160,p:5,c:30,f:2,foods:["½ cup oats/uji with water","1 tsp honey","Black coffee"],note:"Slow-release carbs for heavy legs"},
    {t:"9:30 AM",l:"Post-Workout Breakfast 🍳",kcal:430,p:32,c:30,f:16,foods:["2 eggs + 1 cup soya mince stir-fry","1 slice wholemeal bread","½ cup pawpaw"],note:"Soya mince — affordable & high-protein"},
    {t:"12:30 PM",l:"Lunch 🍛",kcal:490,p:22,c:68,f:8,foods:["Maharagwe stew — 1 cup","Brown rice — ½ cup","Steamed sukuma wiki","Sliced tomato"],note:"High-carb fuels leg day"},
    {t:"3:30 PM",l:"Snack 🥑",kcal:200,p:3,c:14,f:14,foods:["½ avocado on 1 rice cake","10 cherry tomatoes"],note:""},
    {t:"7:00 PM",l:"Dinner 🐟",kcal:380,p:49,c:24,f:3,foods:["Tilapia grilled 200g","Steamed carrots & courgette","½ cup brown rice"],note:""},
  ]},
  {day:"THU",label:"Rest",type:"rest",kcal:1390,p:73,c:134,f:46,items:[
    {t:"7:30 AM",l:"Breakfast 🌿",kcal:370,p:12,c:50,f:12,foods:["Oats with peanut butter + banana","Black tea or coffee"],note:""},
    {t:"11:00 AM",l:"Snack 🍊",kcal:130,p:3,c:18,f:5,foods:["Fresh fruit","10g groundnuts"],note:""},
    {t:"1:00 PM",l:"Lunch 🥗",kcal:380,p:18,c:28,f:18,foods:["Mixed salad bowl + 2 boiled eggs","Lemon + olive oil dressing","1 slice wholemeal bread"],note:""},
    {t:"4:00 PM",l:"Snack 🥛",kcal:130,p:8,c:14,f:2,foods:["1 cup plain low-fat yoghurt"],note:""},
    {t:"7:00 PM",l:"Dinner 🍲",kcal:380,p:32,c:24,f:9,foods:["Lentil or chicken soup — broth-based","1 slice wholemeal bread"],note:"Light dinner = better sleep"},
  ]},
  {day:"FRI",label:"Big Training Day",type:"train",kcal:1720,p:104,c:166,f:57,items:[
    {t:"6:30 AM",l:"Pre-Workout ⚡",kcal:160,p:5,c:30,f:2,foods:["½ cup oats + 1 tsp honey","Black coffee"],note:"Most intense day — load up"},
    {t:"9:30 AM",l:"Post-Workout Breakfast 🍳",kcal:480,p:34,c:6,f:30,foods:["3 scrambled eggs + 2 chicken sausages","½ avocado"],note:"Low-carb post-HIIT = burn stored fat"},
    {t:"12:30 PM",l:"Lunch 🍛",kcal:510,p:42,c:38,f:14,foods:["Grilled chicken thigh 200g","½ cup brown rice","Roasted carrots & courgette","Kachumbari side"],note:""},
    {t:"3:30 PM",l:"Snack 🍌",kcal:170,p:7,c:26,f:5,foods:["1 banana","1 boiled egg"],note:"Potassium prevents cramps"},
    {t:"7:00 PM",l:"Dinner 🍲",kcal:400,p:16,c:66,f:6,foods:["Githeri (maize + beans) — 1 cup","Diced tomato, onion & coriander","1 tsp olive oil drizzle"],note:"Complete protein overnight"},
  ]},
  {day:"SAT",label:"Training",type:"train",kcal:1680,p:104,c:150,f:56,items:[
    {t:"7:00 AM",l:"Breakfast 🍳",kcal:350,p:20,c:22,f:16,foods:["2 eggs any style","Sautéed tomatoes, onion & spinach","1 slice wholemeal toast"],note:""},
    {t:"10:30 AM",l:"Post-Cardio Snack 🥛",kcal:180,p:8,c:28,f:3,foods:["Plain yoghurt 1 cup","½ cup papaya or mango cubes"],note:""},
    {t:"1:00 PM",l:"Lunch 🐟",kcal:480,p:40,c:38,f:10,foods:["Tilapia or omena 200g grilled","Steamed broccoli, carrots & courgette","1 medium sweet potato"],note:""},
    {t:"4:00 PM",l:"Snack 🥜",kcal:220,p:8,c:22,f:13,foods:["Groundnuts 30g","1 apple or orange"],note:""},
    {t:"7:30 PM",l:"Dinner 🍲",kcal:450,p:28,c:40,f:14,foods:["Chapati 1 small (wholemeal)","Beef liver (ini) 100g with onion & tomato","Steamed sukuma wiki"],note:"Liver = iron, B12, zinc 💪"},
  ]},
  {day:"SUN",label:"Rest",type:"rest",kcal:1340,p:60,c:168,f:34,items:[
    {t:"8:30 AM",l:"Brunch 🌿",kcal:380,p:16,c:46,f:12,foods:["Smoothie: banana + spinach + pawpaw + water","2 boiled eggs","1 slice wholemeal toast"],note:""},
    {t:"1:00 PM",l:"Lunch 🍛",kcal:500,p:25,c:50,f:16,foods:["Family lunch — whatever is cooked","Protein = palm · Carbs = fist · Unlimited veg","Skip seconds"],note:"Eat with your people 🤍"},
    {t:"4:00 PM",l:"Snack 🍊",kcal:100,p:1,c:24,f:0,foods:["Fresh fruit","Black tea"],note:""},
    {t:"7:30 PM",l:"Dinner 🍲",kcal:360,p:18,c:48,f:6,foods:["Lentil soup — 1.5 cups","1 slice wholemeal bread","Side salad with lemon"],note:"Light Sunday = better Monday"},
  ]},
];

const TIPS=[
  {emoji:"🔄",cat:"Training",title:"Why You've Plateaued — And How to Fix It",time:"3 min read",
   body:"After 6–8 weeks of the same workouts, your body adapts and stops changing. The fix is progressive overload — adding weight, sets, or reps each week. Your body needs a reason to keep changing. Random workouts feel productive but produce no long-term signal for your muscles. This plan solves that by adding exactly one variable per week.",
   tips:["Increase weight by 2.5–5kg every 1–2 weeks","Add 1 extra set per month on key lifts","Reduce rest time to increase intensity","Track your lifts — what gets measured gets improved"]},
  {emoji:"⚖️",cat:"Weight Loss",title:"Why the Scale Is Lying to You",time:"4 min read",
   body:"If you're training consistently and eating well but the scale isn't moving, you're probably in body recomposition — losing fat and building muscle simultaneously. Muscle is denser than fat, so your body is changing dramatically while the number stays the same. This is actually the best outcome from your training.",
   tips:["Take waist, hip, and arm measurements every 2 weeks","Take progress photos monthly — frontal and side","Track how your clothes fit","Note energy levels, strength gains, and sleep quality"]},
  {emoji:"🛒",cat:"Nutrition",title:"Nairobi Kitchen Swaps for Fat Loss",time:"3 min read",
   body:"You don't need expensive supplements or imported food. The most powerful fat loss foods are already in Nairobi markets at low cost. The key is substitution — making smarter choices with the same budget.",
   tips:["Swap ugali for sweet potato (same fullness, 40% fewer calories)","Omena instead of protein powder (10× cheaper, more nutritious)","Season avocados at Ksh 10–20 — use instead of butter/mayo","Skip soda and juice — 200–400 empty calories per day"]},
  {emoji:"😴",cat:"Recovery",title:"Recovery IS Training — Don't Skip Rest Days",time:"3 min read",
   body:"Fat loss and muscle building actually happen during recovery, not during the workout itself. The workout is the stimulus; rest is when your body responds. Skipping rest days doesn't accelerate results — it slows them down by preventing full adaptation.",
   tips:["7–9 hours of sleep is non-negotiable for fat loss","Rest days with light yoga or walking accelerate recovery","Sleep deprivation increases cortisol, which stores fat","Foam roll for 10 min on rest days — reduces soreness by 30%"]},
  {emoji:"🍽️",cat:"Social Eating",title:"How to Eat at Events Without Losing Progress",time:"3 min read",
   body:"Birthdays, weddings, family lunches — life happens. One social event does not derail your progress. What derails progress is the spiral after — the 'I've already messed up' mindset that leads to 3 bad days. Have a strategy and get back on track the next morning.",
   tips:["Eat a protein-rich snack before the event to reduce hunger","Prioritise protein and vegetables first, then other foods","One plate, no seconds — enjoy it without guilt","Don't drink calories — choose water, black tea, or soda water"]},
  {emoji:"🌅",cat:"Lifestyle",title:"The Morning Workout Advantage",time:"2 min read",
   body:"Morning workouts have one advantage nothing else can replicate: they're done before the day has a chance to interfere. Late nights, meetings, social events — none of these can cancel a workout you've already completed by 9am. Your routine works best when it protects your workout slot first.",
   tips:["Lay out clothes the night before — reduces morning friction","Pre-workout snack ready on the counter","Alarm is non-negotiable — put it across the room","Even 25 minutes counts on a tough morning — just show up"]},
];

function PBar({label,val,max,color}){
  return(
    <div style={{marginBottom:9}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:11,color:B.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</span>
        <span style={{fontSize:11,color,fontWeight:700}}>{val}{label==="Calories"?" kcal":"g"}</span>
      </div>
      <div className="pbar"><div style={{height:6,borderRadius:4,background:color,width:`${Math.min(100,(val/max)*100)}%`}}/></div>
    </div>
  );
}

function WeightRing({current,target,start}){
  const lost=Math.max(0,start-current);
  const total=Math.max(1,start-target);
  const pct=Math.min(100,Math.round((lost/total)*100));
  const r=44,circ=2*Math.PI*r,dash=(pct/100)*circ;
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{position:"relative",width:110,height:110}}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={r} fill="none" stroke={B.surface} strokeWidth="10"/>
          <circle cx="55" cy="55" r={r} fill="none" stroke={B.primary} strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 55 55)"
            style={{transition:"stroke-dasharray 0.6s ease"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div className="brand" style={{fontSize:22,fontWeight:900,color:B.primary,lineHeight:1}}>{pct}%</div>
          <div style={{fontSize:10,color:B.muted}}>to goal</div>
        </div>
      </div>
      <div style={{display:"flex",gap:16,marginTop:12}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:10,color:B.muted,marginBottom:2}}>Lost</div>
          <div className="brand" style={{fontSize:16,fontWeight:800,color:B.green}}>{lost.toFixed(1)} kg</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:10,color:B.muted,marginBottom:2}}>To Go</div>
          <div className="brand" style={{fontSize:16,fontWeight:800,color:B.primary}}>{Math.max(0,current-target).toFixed(1)} kg</div>
        </div>
      </div>
    </div>
  );
}

function WorkoutTab(){
  const [wi,setWi]=useState(0);
  const [di,setDi]=useState(0);
  const [equip,setEquip]=useState("full");
  const [diff,setDiff]=useState("intermediate");
  const [checked,setChecked]=useState({});
  const [demo,setDemo]=useState(null);
  const [demoMap,setDemoMap]=useState({});
  const [demoDebugMap,setDemoDebugMap]=useState({});
  const [demosLoading,setDemosLoading]=useState(false);
  const wk=WEEKS[wi]; const day=wk.days[di];
  const k=`${wi}-${di}`;
  const D=DIFF.find(d=>d.id===diff);
  const toggle=(i)=>setChecked(prev=>{const c=prev[k]||[];return{...prev,[k]:c.includes(i)?c.filter(x=>x!==i):[...c,i]};});
  const done=(i)=>(checked[k]||[]).includes(i);
  const doneCount=(checked[k]||[]).length;
  const pct=Math.round((doneCount/day.ex.length)*100);

  const getSets=(s)=>{
    if(s===1||typeof s!=="number") return String(s);
    const adj=Math.max(1,s+D.sets);
    return String(adj);
  };

  useEffect(()=>{
    let active=true;
    const names=[...new Set(day.ex.map(ex=>sw(ex.n,equip)))];
    setDemosLoading(true);
    fetch(`/api/workoutx?names=${encodeURIComponent(names.join("|"))}`)
      .then(res=>res.ok?res.json():Promise.reject(new Error("WorkoutX unavailable")))
      .then(data=>{
        console.log("[WorkoutX] /api/workoutx response", data);
        if(active){
          setDemoMap(data.exercises||{});
          setDemoDebugMap(data.debug||{});
        }
      })
      .catch(error=>{
        console.error("[WorkoutX] /api/workoutx failed", error);
        if(active){
          setDemoMap({});
          setDemoDebugMap({});
        }
      })
      .finally(()=>{if(active)setDemosLoading(false);});
    return()=>{active=false;};
  },[wi,di,equip]);

  const openDemo=({name,sets,reps,rest,cue,gif,matchedName,hasGif})=>{
    setDemo({name,sets,reps,rest,cue,gif,matchedName,hasGif});
  };

  return(
    <div style={{paddingBottom:16}}>
      {/* Week pills */}
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:14}}>
        {WEEKS.map((w,i)=>(
          <button key={i} className={`wpill ${wi===i?"on":""}`} onClick={()=>{setWi(i);setDi(0);setChecked({});}}>
            {w.label} <span style={{fontSize:10,opacity:0.7}}>{w.theme}</span>
          </button>
        ))}
      </div>

      {/* Intensity */}
      <div style={{background:B.card,borderRadius:12,padding:"12px 14px",marginBottom:14,border:`1px solid ${B.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span className="brand" style={{fontSize:15,fontWeight:800}}>{wk.theme}</span>
          <span style={{fontSize:12,color:B.primary,fontWeight:700}}>{wk.intensity}%</span>
        </div>
        <div className="pbar"><div style={{height:7,borderRadius:999,background:`linear-gradient(90deg,${B.primary},${B.gold})`,width:`${wk.intensity}%`}}/></div>
        <div style={{fontSize:11,color:B.muted,marginTop:6}}>{wk.sub}</div>
      </div>

      {/* Difficulty */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,color:B.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Difficulty level</div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4}}>
          {DIFF.map(d=>(
            <button key={d.id} className={`dlvl ${diff===d.id?"on":""}`}
              onClick={()=>setDiff(d.id)}
              style={{background:diff===d.id?B.glow:B.surface,color:diff===d.id?B.primary:B.muted,padding:"5px 12px",fontWeight:700}}>
              {d.label}
            </button>
          ))}
        </div>
        {D.note&&<div style={{fontSize:11,color:B.primary,marginTop:6}}>💡 {D.note}{D.restMod?` · Rest ${D.restMod}`:""}</div>}
      </div>

      {/* Equipment */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,color:B.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Equipment today</div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4}}>
          {EQUIP.map(e=>(
            <button key={e.id} className={`echip ${equip===e.id?"on":""}`} onClick={()=>setEquip(e.id)}>{e.label}</button>
          ))}
        </div>
      </div>

      {/* Day chips */}
      <div style={{display:"flex",gap:7,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {wk.days.map((d,i)=>(
          <button key={i} className={`dchip ${di===i?"on":""}`} onClick={()=>setDi(i)} style={{flexShrink:0}}>
            <div style={{fontSize:10,fontWeight:700,color:di===i?"#fff":B.muted,textTransform:"uppercase"}}>{d.day}</div>
            <div style={{fontSize:14,margin:"3px 0"}}>{d.emoji}</div>
            <div style={{fontSize:8,color:di===i?"#ffd4c8":B.dim}}>{d.type==="rest"?"Rest":d.type==="recovery"?"Recover":d.label.split(" ")[0]}</div>
          </button>
        ))}
      </div>

      {/* Day card */}
      <div style={{background:B.card,borderRadius:20,border:`1px solid ${B.border}`,overflow:"hidden"}}>
        <div style={{padding:"16px 16px 12px",background:TYPE[day.type]?.bg,borderBottom:`1px solid ${B.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div className="brand" style={{fontSize:22,fontWeight:900}}>{day.emoji} {day.label}</div>
              <div style={{fontSize:11,color:B.muted,marginTop:2}}>{wk.label} · {day.day}</div>
            </div>
            <span className="badge" style={{background:TYPE[day.type]?.bg,color:TYPE[day.type]?.c,border:`1px solid ${TYPE[day.type]?.c}44`}}>{TYPE[day.type]?.l}</span>
          </div>
          {day.type!=="rest"&&day.type!=="recovery"&&(
            <div style={{marginTop:10,display:"flex",alignItems:"center",gap:10}}>
              <div className="pbar" style={{flex:1}}><div style={{height:4,borderRadius:4,background:B.green,width:`${pct}%`,transition:"width 0.3s"}}/></div>
              <span style={{fontSize:11,color:B.green,fontWeight:700}}>{pct}%</span>
            </div>
          )}
        </div>

        {day.warmup.length>0&&(
          <div className="wc" style={{margin:"12px 14px 0",padding:"10px 12px"}}>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:B.green,fontWeight:700,marginBottom:6}}>🌿 Warm-Up (5–8 min)</div>
            {day.warmup.map((w,i)=><div key={i} style={{fontSize:13,color:B.muted,paddingLeft:8,marginBottom:3}}>· {w}</div>)}
          </div>
        )}

        <div style={{padding:"12px 14px"}}>
          <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:B.primary,fontWeight:700,marginBottom:10}}>💥 Main Workout</div>
          {day.ex.map((ex,i)=>{
            const isDone=done(i);
            const name=sw(ex.n,equip);
            const sets=getSets(ex.s);
            const cue=cueFor(ex);
            const match=demoMap[name];
            const debug=demoDebugMap[name];
            const proxyGif=match?.id?`/api/workoutx-gif?id=${encodeURIComponent(match.id)}`:null;
            const gif=proxyGif||fallbackDemo(name);
            return(
              <div key={i} className={`exitem ${isDone?"done":""}`} onClick={()=>day.type!=="rest"&&toggle(i)}>
                <div style={{display:"grid",gridTemplateColumns:"92px 1fr",gap:12,alignItems:"start"}}>
                  <div className="demo-media">
                    <img className="demo-img" src={gif} alt={`${name} demo`} loading="lazy" decoding="async"/>
                    {demosLoading&&<div className="demo-loading">Loading</div>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:8}}>
                      <div className={`check ${isDone?"done":""}`}>{isDone&&<span style={{fontSize:12,color:"#fff"}}>&#10003;</span>}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:800,fontSize:14,color:isDone?B.muted:B.text,textDecoration:isDone?"line-through":"none",lineHeight:1.25}}>{name}</div>
                        <div style={{fontSize:11,color:B.muted,marginTop:4,lineHeight:1.35}}>{cue}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {ex.s!=="—"&&<span className="metric-pill">{sets} sets</span>}
                        {ex.r!=="—"&&<span className="metric-pill">{ex.r} reps</span>}
                        {ex.t&&ex.t!=="—"&&ex.t!==""&&<span className="metric-pill">{ex.t} rest</span>}
                      </div>
                      <button className="demo-btn" onClick={(ev)=>{ev.stopPropagation();openDemo({name,sets,reps:ex.r,rest:ex.t,cue,gif,matchedName:match?.name,hasGif:Boolean(proxyGif)});}}>Watch Demo</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {day.cd.length>0&&(
          <div className="wc" style={{margin:"0 14px 14px",padding:"10px 12px"}}>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:B.purple,fontWeight:700,marginBottom:6}}>🌙 Cool-Down (8–10 min)</div>
            {day.cd.map((c,i)=><div key={i} style={{fontSize:13,color:B.muted,paddingLeft:8,marginBottom:3}}>· {c}</div>)}
          </div>
        )}

        {pct===100&&day.type!=="rest"&&day.type!=="recovery"&&(
          <div style={{margin:"0 14px 14px",background:"#0A1F0A",border:`1px solid ${B.green}44`,borderRadius:12,padding:"12px",textAlign:"center"}}>
            <div style={{fontSize:24,marginBottom:4}}>🎉</div>
            <div className="brand" style={{fontSize:15,fontWeight:800,color:B.green}}>Session Complete!</div>
          </div>
        )}
      </div>
      {demo&&(
        <div
          onClick={()=>setDemo(null)}
          style={{position:"fixed",inset:0,background:"#15172BCC",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"18px"}}
        >
          <div
            onClick={(ev)=>ev.stopPropagation()}
            style={{width:"100%",maxWidth:430,background:B.card,borderRadius:24,padding:18,boxShadow:"0 24px 70px #00000033"}}
          >
            <img className="demo-img" src={demo.gif} alt={`${demo.name} demo`} style={{marginBottom:14}}/>
            <div className="brand" style={{fontSize:20,fontWeight:900,color:B.navy,marginBottom:6}}>{demo.name}</div>
            {!demo.hasGif&&(
              <div style={{background:"#FFF7E5",border:`1px solid ${B.gold}55`,color:B.navy,borderRadius:14,padding:"10px 12px",fontSize:12,fontWeight:700,lineHeight:1.45,marginBottom:12}}>
                No WorkoutX GIF match found yet. Showing the fallback placeholder for this exercise.
              </div>
            )}
            {demo.matchedName&&(
              <div style={{fontSize:11,color:B.primary,fontWeight:800,marginBottom:10}}>Matched demo: {demo.matchedName}</div>
            )}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
              {demo.sets!=="—"&&<span className="metric-pill">{demo.sets} sets</span>}
              {demo.reps!=="—"&&<span className="metric-pill">{demo.reps} reps</span>}
              {demo.rest&&demo.rest!=="—"&&<span className="metric-pill">{demo.rest} rest</span>}
            </div>
            <div style={{fontSize:13,color:B.muted,lineHeight:1.55,marginBottom:16}}>{demo.cue}</div>
            <button className="btn-p" onClick={()=>setDemo(null)} style={{width:"100%",padding:"14px 0",fontSize:14,borderRadius:16}}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MealsTab(){
  const [di,setDi]=useState(0);
  const d=MEALS[di];
  return(
    <div style={{paddingBottom:16}}>
      <div style={{background:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:"16px",marginBottom:16}}>
        <div className="brand" style={{fontSize:18,fontWeight:900,marginBottom:3}}>📊 Daily Targets</div>
        <div style={{fontSize:12,color:B.muted,marginBottom:14}}>Training ~1,700 kcal · Rest ~1,350 kcal · Deficit ~400/day</div>
        <PBar label="Protein" val={115} max={130} color={B.primary}/>
        <PBar label="Carbs" val={160} max={200} color={B.blue}/>
        <PBar label="Fats" val={55} max={80} color={B.green}/>
        <PBar label="Calories" val={1700} max={2200} color={B.purple}/>
      </div>
      <div style={{display:"flex",gap:7,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
        {MEALS.map((m,i)=>(
          <button key={i} className={`dchip ${di===i?"on":""}`} onClick={()=>setDi(i)} style={{flexShrink:0}}>
            <div style={{fontSize:10,fontWeight:700,color:di===i?"#fff":B.muted,textTransform:"uppercase"}}>{m.day}</div>
            <div style={{fontSize:9,color:di===i?"#ffd4c8":B.dim,marginTop:2}}>{m.type==="train"?"Train":"Rest"}</div>
          </button>
        ))}
      </div>
      <div style={{background:B.card,borderRadius:20,border:`1px solid ${B.border}`,overflow:"hidden"}}>
        <div style={{padding:"14px 16px",borderBottom:`1px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div className="brand" style={{fontSize:20,fontWeight:900}}>🍽️ {d.day} — {d.label}</div>
            <div style={{fontSize:11,color:B.muted,marginTop:2}}>{d.kcal} kcal · {d.p}g P · {d.c}g C · {d.f}g F</div>
          </div>
          <span className="badge" style={{background:d.type==="train"?B.light:"#F5F3FF",color:d.type==="train"?B.primary:B.purple,border:`1px solid ${d.type==="train"?B.primary:B.purple}33`}}>
            {d.type==="train"?"Training":"Rest"}
          </span>
        </div>
        <div style={{padding:"12px 14px"}}>
          {d.items.map((m,i)=>(
            <div key={i} className="mitem">
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,flexWrap:"wrap",gap:4}}>
                <div style={{fontWeight:700,fontSize:13}}>{m.l} <span style={{fontWeight:400,fontSize:11,color:B.muted}}>{m.t}</span></div>
                <span style={{fontSize:11,color:B.primary,fontWeight:700,background:B.surface,padding:"2px 8px",borderRadius:6}}>{m.kcal} kcal</span>
              </div>
              {m.foods.map((f,j)=><div key={j} style={{fontSize:13,color:B.muted,paddingLeft:4,marginBottom:2}}>· {f}</div>)}
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:B.primary,background:B.bg,padding:"2px 7px",borderRadius:4}}>P {m.p}g</span>
                <span style={{fontSize:10,color:B.blue,background:B.bg,padding:"2px 7px",borderRadius:4}}>C {m.c}g</span>
                <span style={{fontSize:10,color:B.green,background:B.bg,padding:"2px 7px",borderRadius:4}}>F {m.f}g</span>
              </div>
              {m.note&&<div style={{fontSize:11,color:B.dim,marginTop:6}}>💡 {m.note}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop:16,background:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:"16px"}}>
        <div className="brand" style={{fontSize:15,fontWeight:800,color:B.primary,marginBottom:12}}>🛒 NAIROBI KITCHEN RULES</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[{e:"🥚",t:"Eggs = BFF",b:"Cheapest fastest protein. 2 trays home always."},{e:"🐟",t:"Omena > supplements",b:"10× cheaper. More nutritious."},{e:"🥑",t:"Avocado season",b:"Ksh 10–20. Use instead of butter."},{e:"🍠",t:"Ugali → sweet potato",b:"Same fullness, more fibre."},{e:"💧",t:"Water before meals",b:"500ml × 15 min before. Cuts hunger."},{e:"🚫",t:"Cut these 3",b:"Soda · white bread daily · frying everything."}].map(x=>(
            <div key={x.t} style={{background:B.surface,borderRadius:10,padding:"10px 11px"}}>
              <div style={{fontSize:16,marginBottom:3}}>{x.e}</div>
              <div style={{fontSize:11,fontWeight:700,marginBottom:2}}>{x.t}</div>
              <div style={{fontSize:11,color:B.muted,lineHeight:1.5}}>{x.b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TipsTab(){
  const [open,setOpen]=useState(null);
  const tip=open!==null?TIPS[open]:null;
  if(tip) return(
    <div style={{paddingBottom:16}}>
      <button onClick={()=>setOpen(null)} style={{background:"none",border:"none",color:B.primary,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:16,display:"flex",alignItems:"center",gap:6}}>
        ← Back to Tips
      </button>
      <div style={{background:B.card,borderRadius:20,border:`1px solid ${B.border}`,overflow:"hidden"}}>
        <div style={{padding:"20px 18px",background:B.surface,borderBottom:`1px solid ${B.border}`}}>
          <div style={{fontSize:36,marginBottom:10}}>{tip.emoji}</div>
          <div style={{fontSize:11,color:B.primary,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{tip.cat} · {tip.time}</div>
          <div className="brand" style={{fontSize:22,fontWeight:900,lineHeight:1.2}}>{tip.title}</div>
        </div>
        <div style={{padding:"18px"}}>
          <p style={{fontSize:14,color:B.muted,lineHeight:1.7,marginBottom:18}}>{tip.body}</p>
          <div style={{fontSize:11,color:B.primary,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Key Takeaways</div>
          {tip.tips.map((t,i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:12,padding:"10px 12px",background:B.surface,borderRadius:10}}>
              <span style={{color:B.primary,fontWeight:700,flexShrink:0}}>→</span>
              <span style={{fontSize:13,color:B.muted,lineHeight:1.5}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return(
    <div style={{paddingBottom:16}}>
      <div className="brand" style={{fontSize:22,fontWeight:900,marginBottom:4}}>Fitness Tips 📚</div>
      <div style={{fontSize:13,color:B.muted,marginBottom:20}}>Evidence-based guidance for your journey</div>
      {TIPS.map((t,i)=>(
        <div key={i} className="bcard" onClick={()=>setOpen(i)}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{fontSize:28,flexShrink:0}}>{t.emoji}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,flexWrap:"wrap",gap:4}}>
                <span style={{fontSize:10,color:B.primary,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{t.cat}</span>
                <span style={{fontSize:10,color:B.muted}}>{t.time}</span>
              </div>
              <div className="brand" style={{fontSize:15,fontWeight:800,lineHeight:1.3,marginBottom:6}}>{t.title}</div>
              <div style={{fontSize:12,color:B.muted,lineHeight:1.5}}>{t.body.slice(0,80)}...</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileTab({cw,tw,sw:startW,onUpdateC,onUpdateT}){
  const [ec,setEc]=useState(String(cw));
  const [et,setEt]=useState(String(tw));
  const [saved,setSaved]=useState(false);
  const save=()=>{
    const c=parseFloat(ec),t=parseFloat(et);
    if(!isNaN(c)&&c>0)onUpdateC(c);
    if(!isNaN(t)&&t>0)onUpdateT(t);
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };
  const toLose=Math.max(0,cw-tw).toFixed(1);
  return(
    <div style={{paddingBottom:16}}>
      <div style={{background:B.card,borderRadius:20,border:`1px solid ${B.border}`,padding:"20px 18px",marginBottom:16}}>
        <div className="brand" style={{fontSize:18,fontWeight:900,marginBottom:16}}>⚖️ My Weight Goals</div>
        <div style={{display:"flex",gap:12,marginBottom:18}}>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:B.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Current Weight</div>
            <div style={{position:"relative"}}>
              <input type="number" className="wt-input" value={ec} onChange={e=>setEc(e.target.value)} placeholder="75"/>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:B.muted,fontWeight:600}}>kg</span>
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:B.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Target Weight</div>
            <div style={{position:"relative"}}>
              <input type="number" className="wt-input" value={et} onChange={e=>setEt(e.target.value)} placeholder="65"/>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:B.muted,fontWeight:600}}>kg</span>
            </div>
          </div>
        </div>
        <button className="btn-p" onClick={save} style={{width:"100%",padding:"13px",fontSize:14,marginBottom:20,background:saved?`linear-gradient(135deg,${B.green},#22c55e)`:undefined}}>
          {saved?"✓ Saved!":"Update My Goals"}
        </button>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><WeightRing current={cw} target={tw} start={startW}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{l:"Starting",v:`${startW} kg`,c:B.muted},{l:"Current",v:`${cw} kg`,c:B.primary},{l:"Target",v:`${tw} kg`,c:B.green}].map(x=>(
            <div key={x.l} style={{background:B.surface,borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:10,color:B.muted,marginBottom:4}}>{x.l}</div>
              <div className="brand" style={{fontSize:17,fontWeight:900,color:x.c}}>{x.v}</div>
            </div>
          ))}
        </div>
        {parseFloat(toLose)>0&&(
          <div style={{marginTop:12,padding:"10px 14px",background:`${B.primary}15`,borderRadius:10,border:`1px solid ${B.primary}33`,textAlign:"center"}}>
            <span className="brand" style={{fontSize:14,fontWeight:800,color:B.primary}}>{toLose} kg to go 💪</span>
          </div>
        )}
      </div>
      <div style={{background:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:"16px",marginBottom:16}}>
        <div className="brand" style={{fontSize:15,fontWeight:800,marginBottom:12,color:B.primary}}>📅 WEEKLY SCHEDULE</div>
        {[{d:"Monday",s:"💪 Upper Body Strength",t:"strength"},{d:"Tuesday",s:"🧘 Active Recovery",t:"recovery"},{d:"Wednesday",s:"🦵 Lower Body Strength",t:"strength"},{d:"Thursday",s:"🧘 Active Recovery",t:"recovery"},{d:"Friday",s:"⚡ Full Body HIIT",t:"hiit"},{d:"Saturday",s:"🏃 Cardio + Core",t:"cardio"},{d:"Sunday",s:"😴 Full Rest",t:"rest"}].map(x=>(
          <div key={x.d} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${B.border}`}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:TYPE[x.t]?.c,flexShrink:0}}/>
            <div style={{fontSize:12,color:B.muted,minWidth:84}}>{x.d}</div>
            <div style={{fontSize:13,fontWeight:600}}>{x.s}</div>
          </div>
        ))}
      </div>
      <div style={{background:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:"16px"}}>
        <div className="brand" style={{fontSize:15,fontWeight:800,marginBottom:12,color:B.primary}}>🏋️ DIFFICULTY LEVELS</div>
        {DIFF.map(d=>(
          <div key={d.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:`1px solid ${B.border}`}}>
            <span style={{fontSize:16}}>{d.label.split(" ")[0]}</span>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{d.label.split(" ").slice(1).join(" ")}</div>
              <div style={{fontSize:11,color:B.muted}}>{d.sets===0?"3–4 sets as per plan":d.sets>0?"+1 set · shorter rest":"-1 set · longer rest"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Splash({onStart,onSetWeights}){
  const [step,setStep]=useState(1);
  const [cw,setCw]=useState("");
  const [tw,setTw]=useState("");
  const go=()=>{onSetWeights(parseFloat(cw)||75,parseFloat(tw)||65);onStart();};
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg,#FFFFFF 0%,${B.bg} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"44px 28px",position:"relative",overflow:"hidden"}}>
      <div style={{textAlign:"center",zIndex:1,width:"100%",maxWidth:348}}>
        {step===1?(
          <>
            <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
              <img src={LOGO_B64} alt="Fitness by Hazel" style={{width:104,height:104,borderRadius:28,objectFit:"cover",boxShadow:"0 18px 46px #15172B1A",border:"6px solid #FFFFFF"}}/>
            </div>
            <div className="brand" style={{fontSize:12,fontWeight:800,color:B.gold,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10}}>Fitness by Hazel</div>
            <h1 className="brand" style={{fontSize:42,fontWeight:900,lineHeight:1.05,marginBottom:12,color:B.navy}}>Train well.<br/><span style={{color:B.primary}}>Feel strong.</span></h1>
            <p style={{color:B.muted,fontSize:14,lineHeight:1.7,marginBottom:34}}>A simple 4-week plan for workouts, meals, and steady progress.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:34}}>
              {[{n:"4",l:"Weeks"},{n:"4",l:"Days/wk"},{n:"3",l:"Levels"}].map(s=>(
                <div key={s.l} style={{textAlign:"center",background:B.card,border:`1px solid ${B.border}`,borderRadius:18,padding:"14px 10px",boxShadow:"0 10px 24px #15172B0A"}}>
                  <div className="brand" style={{fontSize:22,fontWeight:900,color:B.navy}}>{s.n}</div>
                  <div style={{fontSize:11,color:B.muted}}>{s.l}</div>
                </div>
              ))}
            </div>
            <button className="btn-p" onClick={()=>setStep(2)} style={{fontSize:16,padding:"17px 0",width:"100%",borderRadius:18}}>Get Started</button>
          </>
        ):(
          <>
            <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
              <img src={LOGO_B64} alt="Fitness by Hazel" style={{width:74,height:74,borderRadius:20,objectFit:"cover",border:"4px solid #FFFFFF",boxShadow:"0 14px 34px #15172B14"}}/>
            </div>
            <div className="brand" style={{fontSize:28,fontWeight:900,marginBottom:8,color:B.navy}}>Set Your Goals</div>
            <p style={{color:B.muted,fontSize:13,marginBottom:24,lineHeight:1.6}}>Enter your current and target weight — update anytime in My Plan.</p>
            <div style={{display:"flex",gap:12,marginBottom:18}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:B.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8,textAlign:"left"}}>Current weight</div>
                <div style={{position:"relative"}}><input type="number" className="wt-input" value={cw} onChange={e=>setCw(e.target.value)} placeholder="e.g. 75"/><span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:B.muted,fontWeight:600}}>kg</span></div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:B.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8,textAlign:"left"}}>Target weight</div>
                <div style={{position:"relative"}}><input type="number" className="wt-input" value={tw} onChange={e=>setTw(e.target.value)} placeholder="e.g. 65"/><span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:B.muted,fontWeight:600}}>kg</span></div>
              </div>
            </div>
            {cw&&tw&&parseFloat(cw)>parseFloat(tw)&&(
              <div style={{padding:"11px 14px",background:B.light,borderRadius:14,border:`1px solid ${B.primary}33`,marginBottom:18}}>
                <span className="brand" style={{fontSize:14,fontWeight:800,color:B.primary}}>Goal: lose {(parseFloat(cw)-parseFloat(tw)).toFixed(1)} kg 💪</span>
              </div>
            )}
            <button className="btn-p" onClick={go} style={{fontSize:16,padding:"17px 0",width:"100%",borderRadius:18,marginBottom:14}}>Let's Go</button>
            <button onClick={()=>{onSetWeights(75,65);onStart();}} style={{background:"none",border:"none",color:B.muted,fontSize:13,cursor:"pointer"}}>Skip for now</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const [splash,setSplash]=useState(true);
  const [tab,setTab]=useState("workout");
  const [startW,setStartW]=useState(75);
  const [cw,setCw]=useState(75);
  const [tw,setTw]=useState(65);
  const setWeights=(c,t)=>{setStartW(c);setCw(c);setTw(t);};
  if(splash) return <div className="fbh"><style>{css}</style><Splash onStart={()=>setSplash(false)} onSetWeights={setWeights}/></div>;
  const TABS=[{id:"workout",icon:"🏋️",label:"Workout"},{id:"meals",icon:"🍽️",label:"Meals"},{id:"tips",icon:"📚",label:"Tips"},{id:"profile",icon:"👤",label:"My Plan"}];
  return(
    <div className="fbh">
      <style>{css}</style>
      <div style={{background:B.card,borderBottom:`1px solid ${B.border}`,padding:"14px 18px 12px",position:"sticky",top:0,zIndex:100,boxShadow:"0 8px 24px #15172B08"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src={LOGO_B64} alt="FBH" style={{width:36,height:36,borderRadius:10,objectFit:"cover"}}/>
            <div>
              <div className="brand" style={{fontSize:18,fontWeight:900,lineHeight:1,color:B.navy}}>Fitness <span style={{color:B.primary}}>by Hazel</span></div>
              <div style={{fontSize:10,color:B.muted}}>4-Week Plan · {cw}kg → {tw}kg</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div className="brand" style={{fontSize:16,fontWeight:900,color:B.gold}}>{Math.max(0,cw-tw).toFixed(1)} kg</div>
            <div style={{fontSize:10,color:B.muted}}>to go</div>
          </div>
        </div>
      </div>
      <div style={{padding:"18px 14px 88px",overflowY:"auto"}}>
        {tab==="workout"&&<WorkoutTab/>}
        {tab==="meals"&&<MealsTab/>}
        {tab==="tips"&&<TipsTab/>}
        {tab==="profile"&&<ProfileTab cw={cw} tw={tw} sw={startW} onUpdateC={setCw} onUpdateT={setTw}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:B.card,borderTop:`1px solid ${B.border}`,display:"flex",zIndex:100,boxShadow:"0 -10px 28px #15172B0D"}}>
        {TABS.map(t=>(
          <button key={t.id} className="tab-btn" onClick={()=>setTab(t.id)}>
            <span style={{fontSize:18}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:700,color:tab===t.id?B.primary:B.dim}}>{t.label}</span>
            {tab===t.id&&<div style={{width:18,height:3,borderRadius:2,background:B.primary}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
