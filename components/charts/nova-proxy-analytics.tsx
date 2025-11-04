"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const trafficData = [
  { hour: 0, packets: 1.2, threats: 2 },
  { hour: 2, packets: 1.5, threats: 3 },
  { hour: 4, packets: 1.7, threats: 4 },
  { hour: 6, packets: 1.9, threats: 6 },
  { hour: 8, packets: 2.4, threats: 5 },
  { hour: 10, packets: 2.9, threats: 4 },
  { hour: 12, packets: 3.4, threats: 5 },
  { hour: 14, packets: 3.8, threats: 6 },
  { hour: 16, packets: 4.2, threats: 7 },
  { hour: 18, packets: 4.8, threats: 8 },
  { hour: 20, packets: 5.4, threats: 6 },
  { hour: 22, packets: 5.9, threats: 5 }
];

const payoutData = [
  { region: "Americas", community: 42, enterprise: 58, sovereign: 26 },
  { region: "EMEA", community: 38, enterprise: 64, sovereign: 31 },
  { region: "APAC", community: 46, enterprise: 72, sovereign: 28 },
  { region: "LATAM", community: 34, enterprise: 54, sovereign: 20 }
];

const uptimeData = [
  { label: "Uptime", value: 0.99998, color: "#4ADE80" },
  { label: "Integrity", value: 0.9972, color: "#66b5ff" },
  { label: "Mitigations", value: 0.962, color: "#ff8583" }
];

export function NovaProxyAnalytics() {
  const trafficRef = useRef<SVGSVGElement | null>(null);
  const payoutRef = useRef<SVGSVGElement | null>(null);
  const uptimeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!trafficRef.current) return;
    const svg = d3.select(trafficRef.current);
    const parent = trafficRef.current.parentElement;
    if (!parent) return;

    const draw = () => {
      const width = Math.max(parent.clientWidth, 320);
      const height = 260;
      const margin = { top: 24, right: 24, bottom: 32, left: 54 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(trafficData, (d) => d.hour) as [number, number])
        .range([0, innerWidth]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(trafficData, (d) => d.packets)! * 1.15])
        .nice()
        .range([innerHeight, 0]);

      const area = d3
        .area<typeof trafficData[0]>()
        .x((d) => x(d.hour))
        .y0(innerHeight)
        .y1((d) => y(d.packets))
        .curve(d3.curveCatmullRom.alpha(0.5));

      const line = d3
        .line<typeof trafficData[0]>()
        .x((d) => x(d.hour))
        .y((d) => y(d.packets))
        .curve(d3.curveCatmullRom.alpha(0.5));

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("path")
        .datum(trafficData)
        .attr("fill", "#4ADE80")
        .attr("fill-opacity", 0.24)
        .attr("d", area);

      g.append("path")
        .datum(trafficData)
        .attr("fill", "none")
        .attr("stroke", "#4ADE80")
        .attr("stroke-width", 2.5)
        .attr("d", line);

      const threatScale = d3
        .scaleLinear()
        .domain([0, d3.max(trafficData, (d) => d.threats)!])
        .range([4, 14]);

      g.selectAll("circle")
        .data(trafficData)
        .join("circle")
        .attr("cx", (d) => x(d.hour))
        .attr("cy", (d) => y(d.packets))
        .attr("r", (d) => threatScale(d.threats))
        .attr("fill", "#181818")
        .attr("stroke", "#4ADE80")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.9);

      const axis = g
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat((value) => `${value}h`));

      axis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      axis.selectAll("path, line").attr("stroke", "#333");

      const yAxis = g.append("g").call(d3.axisLeft(y).ticks(5));
      yAxis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      yAxis.selectAll("path, line").attr("stroke", "#333");
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!payoutRef.current) return;
    const svg = d3.select(payoutRef.current);
    const parent = payoutRef.current.parentElement;
    if (!parent) return;

    const categories = ["community", "enterprise", "sovereign"] as const;

    const draw = () => {
      const width = Math.max(parent.clientWidth, 320);
      const height = 260;
      const margin = { top: 24, right: 24, bottom: 38, left: 60 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const x = d3.scaleBand().domain(payoutData.map((d) => d.region)).range([0, innerWidth]).padding(0.28);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(payoutData, (d) => d.community + d.enterprise + d.sovereign)! * 1.1])
        .range([innerHeight, 0])
        .nice();

      const color = d3
        .scaleOrdinal<string>()
        .domain(categories as unknown as string[])
        .range(["#4ADE80", "#66b5ff", "#ff8583"]);

      const stack = d3.stack<typeof payoutData[0], (typeof categories)[number]>().keys(categories);
      const stackedData = stack(payoutData as any);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const groups = g
        .selectAll("g.layer")
        .data(stackedData)
        .join("g")
        .attr("class", "layer")
        .attr("fill", (d) => color(d.key) as string)
        .attr("opacity", 0.9);

      groups
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d) => x(d.data.region)!)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .attr("rx", 6)
        .attr("ry", 6);

      const axis = g
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x));

      axis
        .selectAll("text")
        .attr("fill", "#afafaf")
        .attr("font-size", 11)
        .attr("transform", "translate(0,4)");
      axis.selectAll("path, line").attr("stroke", "#333");

      const yAxis = g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat((value) => `$${Number(value).toFixed(0)}k`));
      yAxis.selectAll("text").attr("fill", "#afafaf").attr("font-size", 11);
      yAxis.selectAll("path, line").attr("stroke", "#333");

      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - margin.right - 140}, ${margin.top})`)
        .attr("font-size", 11)
        .attr("fill", "#f3f3f3");

      categories.forEach((category, index) => {
        const row = legend.append("g").attr("transform", `translate(0, ${index * 18})`);
        row
          .append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("rx", 2)
          .attr("fill", color(category) as string);
        row
          .append("text")
          .attr("x", 18)
          .attr("y", 10)
          .text(category.charAt(0).toUpperCase() + category.slice(1));
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!uptimeRef.current) return;
    const svg = d3.select(uptimeRef.current);
    const parent = uptimeRef.current.parentElement;
    if (!parent) return;

    const draw = () => {
      const width = Math.max(parent.clientWidth, 260);
      const height = 260;
      const radius = Math.min(width, height) / 2 - 16;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const arc = d3
        .arc<d3.PieArcDatum<(typeof uptimeData)[number]>>()
        .innerRadius(radius * 0.55)
        .outerRadius((d, i) => radius - i * 18);

      const pie = d3
        .pie<(typeof uptimeData)[number]>()
        .value((d) => d.value)
        .sort(null);

      g
        .selectAll("path")
        .data(pie(uptimeData))
        .join("path")
        .attr("fill", (d) => d.data.color)
        .attr("opacity", 0.85)
        .attr("d", arc)
        .append("title")
        .text((d) => `${d.data.label}: ${(d.data.value * 100).toFixed(3)}%`);

      g
        .selectAll("text")
        .data(pie(uptimeData))
        .join("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#0d0d0d")
        .attr("font-size", 11)
        .text((d) => `${(d.data.value * 100).toFixed(2)}%`);

      const labels = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height - 24})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#f3f3f3")
        .attr("font-size", 11);

      uptimeData.forEach((entry, index) => {
        labels
          .append("text")
          .attr("x", (index - (uptimeData.length - 1) / 2) * 120)
          .text(`${entry.label}`);
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Global traffic density</p>
        <svg ref={trafficRef} className="h-[260px] w-full"></svg>
        <p className="text-xs text-[var(--text-tertiary)]">
          Packets are expressed in billions per hour. Circle radius represents mitigated threat bursts.
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Revenue allocation</p>
        <svg ref={payoutRef} className="h-[260px] w-full"></svg>
        <p className="text-xs text-[var(--text-tertiary)]">
          Community, enterprise, and sovereign routes share payouts monthly. Values shown in thousands of credits.
        </p>
      </div>
      <div className="space-y-3 lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Resilience envelope</p>
        <svg ref={uptimeRef} className="h-[260px] w-full"></svg>
        <p className="text-xs text-[var(--text-tertiary)]">
          Uptime, integrity, and mitigation metrics are captured from sovereign auditors across the proxy mesh.
        </p>
      </div>
    </div>
  );
}
