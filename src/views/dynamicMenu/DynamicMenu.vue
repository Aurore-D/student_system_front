<template>


  <el-submenu v-if="menu.children.length>0 && menu.meta.name_en != 'Home'" :index="menu.meta.name_zh">
    <template slot="title">
      <i :class="menu.meta.icon"></i>
      <span>{{ menu.meta.name_zh }}</span>
    </template>

    <el-menu-item v-for="subMenu in menu.children" :key="subMenu.meta.menuId" :index="subMenu.name"
                  @click="$router.push({ name: subMenu.name })">
      <i :class="subMenu.meta.icon"></i>
      <span slot="title">{{subMenu.meta.name_zh }}</span>
    </el-menu-item>
  </el-submenu>

  <div v-else-if="menu.children.length>0 && menu.meta.name_en == 'Home'">
    <el-menu-item v-for="subMenu in menu.children"
                  :key="subMenu.meta.menuId" :index="subMenu.name"
                  @click="$router.push({ name: subMenu.name })">
      <i :class="subMenu.meta.icon"></i>
      <span slot="title">{{subMenu.meta.name_zh }}</span>
    </el-menu-item>
  </div>



</template>

<script>


    export default {
        name: 'DynamicMenu',
        props: {
            menu: {
                type: Object,
                required: true
            }
        },


    }
</script>

<style>
</style>
