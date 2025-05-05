import { createWidget, widget, align, text_style, prop, sport_data, edit_widget_group_type } from '@zos/ui'
import { getSportData } from '@zos/app-access'
import { px } from '@zos/utils'

DataWidget({
  state: {
    intervalId: null,
  },
  init() {

    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'bg.png'
    })

    // Duration
    createWidget(widget.SPORT_DATA, {
      edit_id: 1,
      x: px(0),
      y: px(60),
      w: px(480),
      h: px(160),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      category: edit_widget_group_type.SPORTS,
      default_type: sport_data.DURATION_NET,
      line_width: 0,
      text_size: px(90),
      text_color: 0xffffff,
      sub_text_visible: true,
      sub_text_size: px(24),
      sub_text_color: 0x999999,
      sub_text_y: px(95),
      mock_data: "20:46"
    })

    // Distance
    createWidget(widget.SPORT_DATA, {
      edit_id: 2,
      x: px(-10),
      y: px(195),
      w: px(240),
      h: px(135),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      category: edit_widget_group_type.SPORTS,
      default_type: sport_data.DISTANCE_TOTAL,
      text_size: px(90),
      text_color: 0xffffff,
      sub_text_visible: true,
      sub_text_size: px(24),
      sub_text_color: 0x999999,
      sub_text_y: px(95),
      mock_data: "1.25"
    })

    // Heart Rate
    createWidget(widget.SPORT_DATA, {
      edit_id: 3,
      x: px(250),
      y: px(195),
      w: px(240),
      h: px(135),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      category: edit_widget_group_type.SPORTS,
      default_type: sport_data.HR,
      text_size: px(90),
      text_color: 0xffffff,
      sub_text_visible: true,
      sub_text_size: px(24),
      sub_text_color: 0x999999,
      sub_text_y: px(95),
      mock_data: "76"
    })

    // Speed
    const speedText = createWidget(widget.TEXT, {
      edit_id: 4,
      x: px(0),
      y: px(305),
      w: px(480),
      h: px(160),
      color: 0xffffff,
      text_size: px(80),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '--'
    })

    createWidget(widget.TEXT, {
      edit_id: 5,
      x: px(0),
      y: px(370),
      w: px(480),
      h: px(160),
      color: 0x999999,
      text_size: px(24),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'kt'
    })

    function UpdateSpeed() {
      getSportData({ type: 'speed' },
        (callbackResult) => {
          const { code, data } = callbackResult
          if (code === 0) {
            const [{ speed }] = JSON.parse(data)
            let knots = Math.round((speed * 0.539957) * 10) / 10
            speedText.setProperty(prop.MORE, {
              text: knots,
            })
          }
        })
    }

    this.state.intervalId = setInterval(UpdateSpeed, 1000)
  },

  build() {
    this.init()
  },
  onInit() { },

  onDestroy() {
    this.intervalId && clearInterval(this.state.intervalId)
  }
})
