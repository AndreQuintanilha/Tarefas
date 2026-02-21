import {
  IconHome,
  IconReport,
  IconLogout,
  IconUser,
  IconDeviceDesktop,
  IconChecklist,
} from "@tabler/icons-react";

import { Group, Code } from "@mantine/core";
import classes from "./NavbarSimple.module.css";

// 🔹 TODOS OS MENUS DO SISTEMA
const data = [
  { label: "Dashboard", icon: IconHome },
  { label: "Funcionários", icon: IconUser },
  { label: "Tarefas", icon: IconChecklist },
  { label: "Relatório", icon: IconReport },
];

export function NavbarSimple({
  active,
  setActive,
  open,
  setOpen,
  permissions,
  onLogout,
}) {
  return (
    <nav className={`${classes.navbar} ${open ? classes.open : ""}`}>
      
      <div className={classes.navbarMain}>

        {/* ===== HEADER / LOGO ===== */}
        <Group
          className={classes.header}
          justify="space-between"
          align="center"
        >
          <div className={classes.logoArea}>
            <IconDeviceDesktop size={28} stroke={1.5} />
            <span className={classes.logoText}>Tech Titan System</span>
          </div>

          <Code fw={700}>v1.0.0</Code>
        </Group>

        {/* ===== LINKS DO MENU ===== */}
        <div className={classes.linksMobile}>
          {data
            //  MOSTRA APENAS O QUE O PERFIL PODE VER
            .filter((item) => permissions.includes(item.label))
            .map((item) => {
              const IconComponent = item.icon;

              return (
                <a
                  key={item.label}
                  href="#"
                  className={classes.link}
                  data-active={active === item.label || undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(item.label);
                    setOpen(false); // fecha no mobile
                  }}
                >
                  <IconComponent
                    className={classes.linkIcon}
                    stroke={1.5}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
        </div>
      </div>
{/* ===== FOOTER ===== */}
<div className={classes.footer}>
  <a
    href="#"
    className={classes.link}
    onClick={(e) => {
      e.preventDefault();

      // Pergunta ao usuário se ele quer realmente sair
      const confirmar = window.confirm("Você realmente deseja sair?");
      if (confirmar) {
        onLogout(); // volta para tela de login
      }
    }}
  >
    <IconLogout className={classes.linkIcon} stroke={1.5} />
    <span>Logout</span>
  </a>
</div>
    </nav>
  );
}