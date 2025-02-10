package com.github.mousechannel.jetbrains_icons

import com.github.mousechannel.jetbrains_icons.settings.PluginSettingsState

object IconPack {
  val icons: Icons by lazy { Icons(PluginSettingsState.instance.variant) }
}
