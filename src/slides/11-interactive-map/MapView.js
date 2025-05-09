// @ts-nocheck
import React, { useRef, useEffect, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
// @ts-ignore: missing type declarations for wellknown
import wellknown from "wellknown";
import redliningData from "./data/redlined_with_all_metrics.json";
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";

// some comments.
//1. fix the rotation, somewhere we need to stop the rotation             Done
//2. fix the width of the bar to even length                              Done
//3. the area ID is not very intuitive, think of a way to relate it       Done
//4. get rid of the story                                                 DONE
//5. make the next button more obvious                                    DONE
//7. fix the aspect ratio //                                              DONE




mapboxgl.accessToken = "pk.eyJ1IjoiemhlbmdmYW4wMDAwIiwiYSI6ImNtOTY1YWkxMTB0b3QyaW9xeDB2dzdtcjAifQ.Efsxuzjn9FGnLZOoMVUUIA";

const HEIGHT_MULTIPLIER = 1200;
const BOX_SIZE = 0.002;


export default function MapView() {
const buttonStyle = {
  padding: "8px 16px",
  background: "#ffffffee",
  border: "1px solid #999",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  // 去掉阴影
  boxShadow: "none",
  // 如果想要固定宽度一致也可加上：
  minWidth: "120px",
  textAlign: "center"
};



  const [autoRotate, setAutoRotate] = useState(true);   // ← 默认旋转
  const isUserInteracting = useRef(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const orbiting = useRef(false);

  const storySteps = [
    { title: "Redlining", dataField: null},
    { title: "Redlining Grades", dataField: null },
    { title: "Transition", dataField: null },
    { title: "Unemployment % (2024)", description: "Decades after redlining was outlawed, the neighborhoods once marked in red remain economically trapped.​ \nOur data shows a clear pattern: in 2024, historically redlined areas—grades C and D—experience significantly higher unemployment than areas once deemed “investment-worthy.”​ \nThis isn’t just correlation—it’s a consequence. When neighborhoods were cut off from mortgage access and business loans, they were cut off from upward mobility. \nBusinesses didn’t open. Schools weren’t funded. Wealth wasn’t built.​ \nToday, unemployment lingers where opportunity was once denied. The red lines faded from maps—but not from lives.", dataField: "unemployment_pct" },
    { title: "Median Income (2024)", description: "Your ZIP code should not predict your paycheck.​ But in Boston, median income still aligns eerily with redlining grades.​ \nWealth in America is largely built through homeownership and stable employment—both of which were systematically denied to redlined communities.\n When we compare median income in Boston today by historic redlining grade, the disparities are stark and deeply patterned:​ \nGrade A areas—once considered “Best”—enjoy the highest incomes.​ \nGrade D areas—labeled “Hazardous”—remain at the bottom.​ This isn’t accidental. \nIt’s the residue of policy decisions made generations ago.​ \nThis is not just about money—it’s about access, security, dignity, and a future that feels within reach.​", dataField: "Average_Income" },
    { title: "Mental Distress % (2024)", dataField: "mental_distress_pct", description: "We often talk about redlining’s financial impact. But what about its psychological toll?​ \nIn 2022, communities graded C and D in the redlining maps showed higher levels of reported mental distress. \nAnxiety, depression, chronic stress—these are the emotional inheritances of communities that have endured cycles of disinvestment and neglect.​ \nImagine growing up in a neighborhood where schools are underfunded, jobs are scarce, housing is unstable, and violence feels close.​ \nOver time, these aren’t just environmental pressures—they become internalized traumas.​ \nStructural racism doesn’t just shape cities. It shapes minds."},
    { title: "Smoking % (2024)", dataField: "smoking_pct", description:"When we think about smoking, we often reduce it to a personal choice.\n But public health experts know: choices are shaped by context.​ \nIn 2022, smoking rates were noticeably higher in historically redlined areas.\n​Why? Because when opportunity is stripped away, people seek ways to cope with stress, instability, and systemic neglect.​ \nThese aren’t bad decisions. They’re the fallout of bad policy.​ \nThis map doesn’t just show where people smoke—it shows where people have been failed.​" },
    { title: "Crimes (2023)", dataField: "crime_count_all_years", description:"Crime doesn’t happen in a vacuum it grows in places where opportunity has been stripped away.\n​In historically redlined zones, crime rates remain higher even today. But this isn’t about ”bad neighborhoods,” it’s about neighborhoods that were denied good futures.\n​When communities are boxed in by poor infrastructure, underfunded schools, limited economic access, and a lack of social safety nets, cycles of desperation take root.​\nAnd instead of investment, these neighborhoods received surveillance. Instead of healing, they got handcuffs.\n​We can’t police our way out of policies that created these conditions." },
    { title: "Evictions (2020-2024)", dataField: "eviction_count_all_years", description:"Housing isn’t just a building—it’s stability.​ \nOur data shows that eviction rates are disproportionately high in areas graded C and D. These are the same places where financial vulnerability is baked into the system.​ \nEvictions aren’t just about unpaid rent. They’re about rising rents in undervalued properties.\n​They’re about absentee landlords.​ They’re about entire communities being treated as disposable.\n​The legacy of redlining is a housing market that was never designed to protect everyone equally." },

    //{ title: "Poor Health %", dataField: "poor_health_pct" },
    // { title: "Homeownership %", dataField: "homeownership_pct" },
    // { title: "Rentership %", dataField: "rentership_pct" },

    { title: "Crowded Housing % (2024)", dataField: "crowded_housing_pct", description:"Imagine raising a family where multiple households share one roof, where privacy is a luxury, and where every inch feels borrowed. This is the reality in many formerly redlined neighborhoods.​\nOur findings show a higher percentage of crowded housing in grades C and D.​ \nWhy? Because when neighborhoods are historically denied new development, affordable housing, and adequate space, demand outpaces supply.​ \nCrowding isn’t a cultural choice. It’s a consequence of constrained options.\n​Redlining didn’t just limit where people could buy it constrained how they could live.​" },
    { title: "Is Boston still suffering the effects of redlining?", dataField: null, description:"What we found was undeniable.\n​From income to mental health, from eviction risk to life expectancy, the neighborhoods once outlined in red still carry the weight of that ink.\n​This isn’t about the past.\n​This is about now. About how we design cities. Who gets to feel safe. Who gets to thrive. And who’s still forced to fight for the basics.\n​These maps are not just artifacts.​ They’re mirrors.\nYou, right now, can choose to see the invisible lines and help erase them.​\nThe story of redlining isn’t finished.\n​But it can end differently if we decide to redraw the map​.​" },
  ];

  const [currentStep, setCurrentStep] = useState(storySteps.length - 1); // start with  the explore mode page
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSpin = () => {
    setAutoRotate(p => {
      const next = !p;
      orbiting.current = next;
      return next;
    });
  };

  const [hoveredAreaId, setHoveredAreaId] = useState(null);
  const areaIdToFeatureId = useRef(new Map());

  // const gradeColors = {
  //   A: "#1a9850",
  //   B: "#91cf60",
  //   C: "#d9ef8b",
  //   D: "#fee08b"
  // };

  const gradeColors = {
    A: "#5c8546",
    B: "#59829c",
    C: "#dace74",
    D: "#c0747c"
  };

  const getCentroid = (wkt) => {
    const nums = wkt.replace(/[^0-9\.,\-\s]/g, "").trim();
    const pairs = nums.split(/,\s*/).map(p => p.split(/\s+/).map(Number));
    const lngs = pairs.map(p => p[0]);
    const lats = pairs.map(p => p[1]);
    return [
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
      (Math.min(...lats) + Math.max(...lats)) / 2
    ];
  };

  const processedData = useMemo(() =>
    redliningData
      .filter(f => f.city?.toLowerCase() === "boston")
      .map(f => ({ ...f, position: getCentroid(f.geometry), area_id: f.area_id}))
  , []);

  const fieldStats = useMemo(() => {
    const stats = {};
    processedData.forEach(row => {
      Object.entries(row).forEach(([k, v]) => {
        if (typeof v === "number" && Number.isFinite(v)) {
          if (!stats[k]) stats[k] = { min: v, max: v };
          else {
            stats[k].min = Math.min(stats[k].min, v);
            stats[k].max = Math.max(stats[k].max, v);
          }
        }
      });
    });
    return stats;
  }, [processedData]);

  const buildParcelGeoJSON = () => {
    const features = redliningData
      .filter(f => f.city?.toLowerCase() === "boston")
      .map((row, i) => ({
        type: "Feature",
        id: row.area_id,
        properties: {
          grade: row.grade || "N/A",
          zone: row.zone_idx,
          area_id: row.area_id,
        },
        geometry: wellknown(row.geometry)
      }));
    return { type: "FeatureCollection", features };
  };

  const buildExtrusionGeoJSON = (stepIdx) => {

    if (stepIdx === 0 || stepIdx === 1 || stepIdx ===2 || stepIdx === storySteps.length - 1) {
      return { type: "FeatureCollection", features: [] };
    }

    const field = storySteps[stepIdx].dataField;
    const { min, max } = field ? fieldStats[field] || {} : {};
    const range = max - min || 1;

    const features = processedData.map((row, i) => {
      const [lng, lat] = row.position;
      const rawVal = field ? Number(row[field]) : null;
      const norm = field ? (rawVal - min) / range : 0;
      const height = stepIdx === 0 ? 10 : norm * HEIGHT_MULTIPLIER;
      return {
        type: "Feature",
        properties: {
          zone: row.zone_idx,
          grade: row.grade || "N/A",        //  新增 grade
          category: row.category|| "N/A",  // category
          value: rawVal,
          norm,
          height,
          id: i
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [lng - BOX_SIZE, lat - BOX_SIZE],
            [lng + BOX_SIZE, lat - BOX_SIZE],
            [lng + BOX_SIZE, lat + BOX_SIZE],
            [lng - BOX_SIZE, lat + BOX_SIZE],
            [lng - BOX_SIZE, lat - BOX_SIZE]
          ]]
        }
      };
    });

    return { type: "FeatureCollection", features };
  };

  const featureStats = useMemo(() => {
    const field = storySteps[currentStep].dataField;
    if (!field) return null;

    // 收集所有有效数值
    const vals = processedData
      .map((d) => d[field])
      .filter((v) => typeof v === "number" && !isNaN(v));
    if (vals.length === 0) return null;

    const max = Math.max(...vals);

    // 用 d.neighborhood 作为左侧标签
    const sorted = processedData
      .filter((d) => typeof d[field] === "number")
      .map((d) => ({
        value: d[field],
        grade: d.grade,
        name: d.neighborhood,   // ← 这里改成 neighborhood
        featureId: d.area_id,   // 用于高亮
      }))
      .sort((a, b) => a.value - b.value);

    return { max, sorted };
  }, [processedData, storySteps, currentStep]);



  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-71.0589, 42.3601],
      zoom: 11,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    map.current.on("load", () => {
      // 1. 先加 Source
      map.current.addSource("parcels", {
        type: "geojson",
        data: buildParcelGeoJSON(),
        generateId: true,
      });
      map.current.addSource("boxes", {
        type: "geojson",
        data: buildExtrusionGeoJSON(currentStep)
      });


      map.current.on('idle', () => {
        const features = map.current.querySourceFeatures("parcels");
        features.forEach(f => {
          if (f.properties && f.properties.area_id != null) {
            areaIdToFeatureId.current.set(f.properties.area_id, f.id);
          }
        });
      });

      // 2. 再加 Layer
      map.current.addLayer({
        id: "overview-fill",
        type: "fill",
        source: "parcels",
        paint: {
          "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#ff6600",  // hover状态橙色
          [
            "match",
            ["get", "grade"],
            "A", gradeColors.A,
            "B", gradeColors.B,
            "C", gradeColors.C,
            "D", gradeColors.D,
            /* other */ "#cccccc"
          ]
        ],
        "fill-opacity": 0.5
        }
      });

      map.current.addLayer({
        id: "overview-outline",
        type: "line",
        source: "parcels",
        paint: {
          "line-color": "#333",
          "line-width": 0.1
        }
      });

      map.current.addLayer({
        id: "boxes-layer",
        type: "fill-extrusion",
        source: "boxes",
        paint: {
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.85,
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["get", "norm"],
            0, "#d9ef8b",
            0.5, "#66bd63",
            1, "#1a9850"
          ],
          "fill-extrusion-transition": {
            duration: 300,
            delay: 0
          }
        }
      });

      // 3. 加 Hover Popup（美化版）
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "custom-popup",
        offset: [0, -10]
      });

      map.current.on("mousemove", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["boxes-layer"]
        });

        if (features.length > 0) {
          const feature = features[0];
          const grade = feature.properties.grade || "N/A";
          const category = feature.properties.category || "N/A";

          popup
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="background: rgba(255,255,255,0.9); padding: 100px 120px; border-radius: 8px; font-size: 12px;">
                <strong>Zone ${feature.properties.zone}</strong><br/>
                Grade: ${grade}<br/>
                Category: ${category}
              </div>
            `)
            .addTo(map.current);

          map.current.getCanvas().style.cursor = "pointer";
        } else {
          map.current.getCanvas().style.cursor = "";
          popup.remove();
        }
      });



    });
  }, []);




  // step切换 ➔ 动态平滑生长 extrusion & 控制pitch/orbit
  useEffect(() => {
    if (!map.current) return;

    // --- 1. extrusion生长动画 ---
    const targetData = buildExtrusionGeoJSON(currentStep);
    const src = map.current.getSource("boxes");
    if (!src) return;

    const animatingData = JSON.parse(JSON.stringify(targetData));
    animatingData.features.forEach(f => f.properties.height = 0);
    src.setData(animatingData);

    let frame = 0;
    const totalFrames = 30;

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);

      const currentData = JSON.parse(JSON.stringify(targetData));
      currentData.features.forEach((f, idx) => {
        const targetHeight = targetData.features[idx].properties.height;
        f.properties.height = targetHeight * progress;
      });

      src.setData(currentData);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

  }, [currentStep, fieldStats]);

  /* ---------- orbit + 拖动 ---------- */
useEffect(() => {
  if (!map.current) return;

  /* === 拖拽交互标记 === */
  const onMouseDown = () => (isUserInteracting.current = true);
  const onMouseUp   = () => (isUserInteracting.current = false);

  map.current.off("mousedown", onMouseDown);
  map.current.off("mouseup",   onMouseUp);
  map.current.on ("mousedown", onMouseDown);
  map.current.on ("mouseup",   onMouseUp);

  /* === 视角 === */
  if (currentStep === 0) {
    map.current.easeTo({ pitch: 0, bearing: 0, zoom: 11, duration: 1000 });
  } else {
    map.current.jumpTo({
      pitch: 55,
      bearing: map.current.getBearing(),
      zoom: 11
    });
  }
  map.current.dragPan.enable();

  /* === 自动旋转 === */
  let rafId = null;
  const rotate = () => {
    if (!autoRotate || !map.current) return;
    if (!isUserInteracting.current) {
      map.current.setBearing(map.current.getBearing() + 0.05);
    }
    rafId = requestAnimationFrame(rotate);
  };

  /* 只要 autoRotate 为真就立即启动；为假就取消 */
  if (autoRotate) {
    if (rafId) cancelAnimationFrame(rafId); // 防重复
    rotate();
  } else {
    orbiting.current = false;
  }

  /* === 清理 === */
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    map.current.off("mousedown", onMouseDown);
    map.current.off("mouseup",   onMouseUp);
  };
}, [currentStep, autoRotate]);


  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* Sidebar */}
      <div
      style={{
      width: '25vw',
      minWidth: 240,
      maxWidth: 400,
      height: '100vh',
      backgroundColor: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(16px) saturate(180%)',
      /* 去掉 overflow */
      /* overflow: 'auto', */
      padding: 16,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      /* 让子元素竖向铺满 */
      justifyContent: 'flex-start',
      }}
      >


        {currentStep === storySteps.length - 1 && (
        <div
          style={{
            marginTop: 20,
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <h4 style={{ marginBottom: "8px" }}>Echoes of History: From Redlining to Today's Inequities</h4>
          <p style={{ marginBottom: "16px", fontSize: "18px", color: "#555" }}>
            Feel free to explore any section below:
          </p>

          <div
          style={{
            display: "flex",
            flexWrap: "wrap",  // Allow buttons to wrap to the next line
            justifyContent: "center",  // Center the buttons
            gap: "10px",  // Small gap between buttons
          }}
        >
          {storySteps
          .filter((_, index) => index !== 0 && index !== 1 && index !== 2 && index !== storySteps.length - 1)
          .map((step, index) => (
            <button
              key={index+3}
              style={{
                padding: "8px 16px",
                backgroundColor: "#1a9850",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flexShrink: 0,  // Prevent shrinking, keep button size consistent
              }}
              onClick={() => setCurrentStep(index+3)} // Jump to specific step
            >
              {step.title}
            </button>
          ))}
        </div>
        </div>
      )}



        {/* --- 插入统计图模块 --- */}
        {featureStats && (
  <div style={{ marginTop: 0 }}>

    {/* 📈 Feature-by-Parcel 横向条形图 */}
    <h4 style={{ margin: "0 0 8px", fontSize: 14 }}>
      {storySteps[currentStep].title} by Neighborhood
    </h4>

    {/* 标题行 */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 0",
        fontSize: 12,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 4
      }}
    >
      {/* Neighborhood 列 */}
      <div
        style={{
          width: 80,
          textAlign: "right",
          marginRight: 8,
        }}
      >
        Neighborhood
      </div>

      {/* Bar 列 占满剩余 */}
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        {storySteps[currentStep].title}
      </div>

      {/* Value 列 */}
      <div
        style={{
          width: 40,
          textAlign: "right",
          marginLeft: 8,
        }}
      >
        Value
      </div>
    </div>

    {/* 列表 */}
    <div>
      {featureStats.sorted.map(({ value, grade, name, featureId }, idx) => {
        // 统一缩放到侧边栏最大宽度(假设侧边栏宽度约280px)
        const maxBarPx = 220;
        const widthPx = Math.max(
          1,
          (value / featureStats.max) * maxBarPx
        );
        const bgColor = gradeColors[grade] || "#999";

        return (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "2px 0",
              cursor: "pointer",
              background:
                hoveredAreaId === featureId
                  ? "rgba(102, 189, 99, 0.2)"
                  : "transparent",
            }}
            onMouseEnter={() => {
              setHoveredAreaId(featureId);
              const fid = areaIdToFeatureId.current.get(featureId);
              if (map.current && fid != null) {
                map.current.setFeatureState(
                  { source: "parcels", id: fid },
                  { hover: true }
                );
              }
            }}
            onMouseLeave={() => {
              setHoveredAreaId(null);
              const fid = areaIdToFeatureId.current.get(featureId);
              if (map.current && fid != null) {
                map.current.setFeatureState(
                  { source: "parcels", id: fid },
                  { hover: false }
                );
              }
            }}
          >
            {/* 左侧 社区名称 */}
            <div
              style={{
                width: 80,
                fontSize: 12,
                color: "#333",
                marginRight: 8,
                textAlign: "right",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </div>

            {/* 可动画的 横向 Bar */}
            <div style={{ flexGrow: 1, overflow: "hidden" }}>
              <div
                style={{
                  width: 0,
                  height: 6,
                  background: bgColor,
                  borderRadius: 3,
                  transition: "width 0.6s ease-out",
                }}
                ref={(el) => {
                  if (el) {
                    requestAnimationFrame(() => {
                      el.style.width = `${widthPx}px`;
                    });
                  }
                }}
              />
            </div>

            {/* 右侧 值 */}
            <div
              style={{
                width: 40,
                marginLeft: 8,
                textAlign: "right",
                fontSize: 10,
                color: "#333",
              }}
            >
              {value.toFixed(0)}
            </div>
          </div>
        );
      })}
</div>



    {/* ====== 右下角旋转按钮 ====== */}
    {/* Pause/Resume Spin 按钮 */}
    <button
      onClick={toggleSpin}
      style={{
        ...buttonStyle,
        position: "absolute",
        bottom: 50,
        right: 20,
        zIndex: 5
      }}
    >
      {autoRotate ? "⏸ Pause Spin" : "▶ Resume Spin"}
    </button>

    {/* 📈 X轴数值范围 */}
    {/* <div style={{
      fontSize: 10,
      color: "#666",
      display: "flex",
      justifyContent: "space-between",
      marginTop: 2
    }}>
      <div>{featureStats.min.toFixed(0)}</div>
      <div>{featureStats.max.toFixed(0)}</div>
    </div> */}

    <p style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>Data normalized per feature</p>


  </div>
)}



      {currentStep !== 0 && currentStep !==1 && currentStep !==2 && currentStep !== storySteps.length - 1 && (
      <div style={{ marginTop: '16px' }}>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#1a9850",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setCurrentStep(storySteps.length - 1)} // Navigate to the last step
        >
          Explore
        </button>
      </div>
    )}

      </div>



      {/* Map */}
      <div
        ref={mapContainer}
        style={{
          flexGrow: 1,
          width: "100%",
          height: "calc(100vh + 20px)", // 让地图整体高20px，抵消上面的margin
          marginTop: "-20px",            // 地图整体上移20px，不留白
          boxSizing: "border-box",
          overflow: "hidden",

        }}
      />


        {/* Legend */}
      <div style={{
        position: "absolute",
        top: 20,
        right: 20,
        background: "rgba(255,255,255,0.8)",
        padding: "12px 16px",
        borderRadius: "8px",
        fontSize: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        zIndex: 5,
        width: 200
      }}>

        <div style={{ fontWeight: "bold", marginBottom: 6 }}>Redlining Grades</div>

        {/* Grade Colors */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <div style={{ width: 12, height: 12, background: gradeColors.A, marginRight: 6, borderRadius: 2 }}></div>
          Grade A (Best)
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <div style={{ width: 12, height: 12, background: gradeColors.B, marginRight: 6, borderRadius: 2 }}></div>
          Grade B (Desirable)
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <div style={{ width: 12, height: 12, background: gradeColors.C, marginRight: 6, borderRadius: 2 }}></div>
          Grade C (Declining)
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <div style={{ width: 12, height: 12, background: gradeColors.D, marginRight: 6, borderRadius: 2 }}></div>
          Grade D (Hazardous)
        </div>
        <div style={{ marginTop: 12, fontWeight: "bold", marginBottom: 4 }}>
          Type
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <div style={{
            width: 12,
            height: 12,
            background: "#cccccc",
            marginRight: 6,
            borderRadius: 2
          }} />
          Commercial/Industrial
        </div>

        {/* Value Gradient Bar */}
        {storySteps[currentStep].dataField && (
          <>
            <div style={{ marginTop: 8, fontWeight: "bold", marginBottom: 4 }}>
              {storySteps[currentStep].title}
            </div>
            <div style={{
              height: 10,
              width: "100%",
              background: "linear-gradient(to right, #d9ef8b, #66bd63, #1a9850)",
              borderRadius: 4,
              marginBottom: 4
            }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555" }}>
              <div>Low</div>
              <div>High</div>
            </div>
          </>
        )}

        {/* Category Meaning */}
        <div style={{ marginTop: 12, fontWeight: "bold", marginBottom: 4 }}>Redlining Grades Meaning:</div>
        <div style={{ fontSize: 10, lineHeight: "14px", color: "#333" }}>
          Based on historical redlining survey<br />
          Category reflects neighborhood desirability at the time
        </div>
      </div>


    </div>



  );
}