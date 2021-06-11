<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  right: 0;
  top: 0;
  height: 64px;
  padding: 0;
  transition: all .2s ease-in-out;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item {
  background: transparent;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  height: 100vh;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  background: #191a23;
}

.layout-content {
  width: 100vw;
  height: 100vh;
}
.sider-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sider-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px #101117;
}
.sider-menu {
  width: 100%;
  flex: auto;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Sider
        class="layout-sider"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="80"
        v-model="isCollapsed"
        :width="256"
      >
        <div class="sider-content">
          <div class="sider-logo">
            <img
              style="height: 80%; vertical-align: middle"
              :src="!isCollapsed ? '/logo.png' : '/logo-small.png'"
            />
          </div>
          <div class="sider-menu">
            <Menu
              active-name="activeMenu"
              theme="dark"
              width="auto"
              :class="menuitemClasses"
            >
              <MenuItem :name="item._id" v-for="item in menuList" :key="item._id" :to="item.url">
                <Icon type="ios-navigate"></Icon>
                <span>{{ item.name }}</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sider>
      <Layout
        class="layout-content"
        :style="{ paddingLeft: isCollapsed ? '80px' : '256px' }"
      >
        <Header class="layout-header-bar" :style="{ width: isCollapsed ? 'calc(100% - 80px)' :  'calc(100% - 256px)' }">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{ margin: '0 20px', cursor: 'pointer' }"
            type="md-menu"
            size="24"
          ></Icon>
        </Header>
        <Content
          :style="{ minHeight: '260px', paddingTop: '64px' }"
        >
          <nuxt/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
      activeMenu: '',
      menuList: []
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  mounted() {
    console.log('default layout, 执行周期')
    this.getMenuData();
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    async getMenuData() { // 获取菜单数据
      await this.$axios('/system/menuAll', {
        method: 'post',
      }).then(res => {
        console.log(res)
        this.menuList = res.data
      });
    },
  },
};
</script>