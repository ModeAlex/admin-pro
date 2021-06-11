<template>
  <Row :gutter="12" style="height: 50px">
    <Col :span="12" style="display: flex; align-items: center">
      <slot name="left" />
    </Col>
    <Col :span="12">
      <Row
        :gutter="15"
        justify="end"
        style="height: 20px; margin-top: 15px; padding-right: 2px"
      >
        <Col class="col-icon">
          <Tooltip content="密度" placement="top">
            <Dropdown trigger="click" style="margin-left: 20px" @on-click="density">
              <Icon type="md-list" class="pointer" :size="iconSize" />
              <DropdownMenu slot="list">
                <DropdownItem name="default">
                  <div>默认</div>
                </DropdownItem>
                <DropdownItem name="large">
                  <div>宽松</div>
                </DropdownItem>
                <DropdownItem name="small">
                  <div>紧凑</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
        </Col>
        <Col class="col-icon">
          <Tooltip content="全屏" placement="top">
            <Icon type="md-expand" class="pointer" :size="iconSize" />
          </Tooltip>
        </Col>
        <Col class="col-icon">
          <Tooltip content="退出全屏" placement="top">
            <Icon type="md-contract" class="pointer" :size="iconSize" />
          </Tooltip>
        </Col>
        <Col class="col-icon">
          <Tooltip content="刷新" placement="top">
            <Icon type="md-refresh" class="pointer" :size="iconSize" />
          </Tooltip>
        </Col>
        <Col class="col-icon">
          <Tooltip content="列设置" placement="top">
            <Icon type="md-options" class="pointer" :size="iconSize" />
          </Tooltip>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      iconSize: 20,
    };
  },
  methods: {
    density(size) {
      this.$emit('density', size)
    },
    select(name) {
      console.log('测试出发', name)
    }
  }
};
</script>

<style scoped>
.col-icon {
  line-height: 20px;
}
</style>